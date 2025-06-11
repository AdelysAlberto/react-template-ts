import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

// Clean up outdated caches
cleanupOutdatedCaches();

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new NetworkFirst({
    cacheName: "google-fonts-stylesheets",
  })
);

// Cache the underlying font files with a cache-first strategy for 1 year
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        maxEntries: 30,
      }),
    ],
  })
);

// Cache images with a cache-first strategy
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Install and activate service worker
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());

// Push notification event handler
self.addEventListener("push", event => {
  console.log("[Service Worker] Push notification received", event);

  // Safely check notification permission
  const notificationSupported = "Notification" in self;
  const notificationPermission = notificationSupported ? Notification.permission : "denied";
  console.log("[Service Worker] Notification permission:", notificationPermission);

  if (!(notificationSupported && Notification.permission === "granted")) {
    console.log("[Service Worker] Notifications not supported or permission not granted");
    return;
  }

  if (event.data) {
    try {
      // Log the raw data for debugging
      const rawData = event.data.text();
      console.log("[Service Worker] Raw notification payload:", rawData);

      // Try to parse the data as JSON
      let message;
      try {
        message = event.data.json();
        console.log("[Service Worker] Parsed notification payload:", message);
      } catch (_) {
        console.log("[Service Worker] Could not parse JSON, using text payload");
        // If JSON parsing fails, create a simple notification with the raw text
        message = {
          title: "New notification",
          body: rawData,
        };
      }

      // Set optimal icons for different platforms
      // Main notification icon (large) - Use our app icon as default
      const iconPath = message.icon || "/ryg-app-icon.png";
      // Fix icon path if it starts with / but doesn't exist
      const fixedIconPath = iconPath.startsWith("/images/")
        ? "/ryg-app-icon.png" // Fallback to known icon
        : iconPath;

      // Set badge to a smaller icon (for notification tray)
      // This should be very simple, usually monochrome, and smaller than the main icon
      const badgePath = message.badge || "/pwa-64x64.png";

      // Extract notification details with fallbacks for different payload formats
      const notificationOptions = {
        body: message.body || message.message || message.content || "You have a new notification",
        // Main notification image
        icon: fixedIconPath,
        // Small icon for notification tray (should be 96x96 or smaller)
        badge: badgePath,
        // Android-specific image that appears in the expanded notification
        image: message.image || null,
        vibrate: message.vibrate || [100, 50, 100],
        data: message.data || {},
        actions: message.actions || [],
        tag: message.tag || `default-tag${Date.now()}`,
        requireInteraction: true,
        renotify: true,
        silent: false,
        timestamp: message.timestamp || Date.now(),
      };

      console.log("[Service Worker] Showing notification with options:", notificationOptions);

      // Show the notification with better error handling
      event.waitUntil(
        self.registration
          .showNotification(message.title || "Raspa y Gana", notificationOptions)
          .then(() => {
            console.log("[Service Worker] Notification displayed successfully");
            // Force a visual notification for localhost testing
            if (self.location.hostname === "localhost" || self.location.hostname === "127.0.0.1") {
              console.log("[Service Worker] On localhost - trying alternative notification approach");
              // Try to create a unique notification
              return self.registration.showNotification(`${message.title || "Raspa y Gana"} (${new Date().toLocaleTimeString()})`, {
                ...notificationOptions,
                tag: `force-${Date.now()}`, // Ensure unique tag
              });
            }
          })
          .catch(err => console.error("[Service Worker] Failed to display notification:", err))
      );
    } catch (error) {
      console.error("[Service Worker] Error processing notification:", error);

      // Try a fallback notification if all else fails
      event.waitUntil(
        self.registration
          .showNotification("Raspa y Gana", {
            body: `You have a new notification - ${new Date().toLocaleTimeString()}`,
            icon: "/ryg-app-icon.png",
            badge: "/pwa-64x64.png",
            tag: `fallback-${Date.now()}`, // Ensure unique tag
            requireInteraction: true,
          })
          .then(() => console.log("[Service Worker] Fallback notification displayed"))
          .catch(err => console.error("[Service Worker] Even fallback notification failed:", err))
      );
    }
  } else {
    console.log("[Service Worker] Push event has no data");
  }
});

// Handle notification click event
self.addEventListener("notificationclick", event => {
  console.log("[Service Worker] Notification clicked", event);

  // Close the notification
  event.notification.close();

  // Get the action (if any)
  const action = event.action;
  const notification = event.notification;
  const data = notification.data || {};

  // Default URL to open if none specified
  let targetUrl = "/";

  // Check if we have a specific URL to navigate to
  if (data.url) {
    targetUrl = data.url;
  } else if (action) {
    // Handle different actions
    switch (action) {
      case "open_balance":
        targetUrl = "/user/transactions";
        break;
      case "open_lottery":
        targetUrl = "/lottery";
        break;
      case "open_casino":
        targetUrl = "/casino";
        break;
      case "open_sports":
        targetUrl = "/sports";
        break;
      default:
        // Use the action as a URL if no specific case matches
        if (action.startsWith("/")) {
          targetUrl = action;
        }
    }
  }

  // Open the target URL
  event.waitUntil(
    self.clients.matchAll({ type: "window" }).then(clientList => {
      // Check if there is already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url === targetUrl && "focus" in client) {
          return client.focus();
        }
      }
      // If no window/tab is open, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle notification close event (optional)
self.addEventListener("notificationclose", event => {
  console.log("[Service Worker] Notification closed", event);
  // You can track when users dismiss notifications here
});

// Handle push subscription change (when the subscription expires or is changed)
self.addEventListener("pushsubscriptionchange", event => {
  console.log("[Service Worker] Push subscription changed", event);

  // You would typically re-subscribe and send the new subscription to your server
  // This is a placeholder for that logic
  event.waitUntil(
    // Your re-subscription logic would go here
    Promise.resolve()
  );
});
