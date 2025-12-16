'use strict';

module.exports = {
  type: 'content-api',
  routes: [
    // ============= EMAIL ROUTES =============
    {
      method: 'POST',
      path: '/send',
      handler: 'controller.send',
      config: {
        auth: false, // Can be called from anywhere
        description: 'Send email via MagicMail router',
      },
    },

    // ============= UNIFIED MESSAGE ROUTE =============
    {
      method: 'POST',
      path: '/send-message',
      handler: 'controller.sendMessage',
      config: {
        auth: false,
        description: 'Send message via Email or WhatsApp (unified API)',
      },
    },

    // ============= WHATSAPP ROUTES =============
    {
      method: 'POST',
      path: '/send-whatsapp',
      handler: 'controller.sendWhatsApp',
      config: {
        auth: false,
        description: 'Send WhatsApp message',
      },
    },
    {
      method: 'GET',
      path: '/whatsapp/status',
      handler: 'controller.getWhatsAppStatus',
      config: {
        auth: false,
        description: 'Get WhatsApp connection status',
      },
    },
    {
      method: 'GET',
      path: '/whatsapp/check/:phoneNumber',
      handler: 'controller.checkWhatsAppNumber',
      config: {
        auth: false,
        description: 'Check if phone number is on WhatsApp',
      },
    },

    // ============= TRACKING ROUTES =============
    {
      method: 'GET',
      path: '/track/open/:emailId/:recipientHash',
      handler: 'analytics.trackOpen',
      config: {
        policies: [],
        auth: false,
        description: 'Track email open (tracking pixel)',
      },
    },
    {
      method: 'GET',
      path: '/track/click/:emailId/:linkHash/:recipientHash',
      handler: 'analytics.trackClick',
      config: {
        policies: [],
        auth: false,
        description: 'Track link click and redirect',
      },
    },
  ],
};
