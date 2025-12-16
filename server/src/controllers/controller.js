'use strict';

/**
 * Main Controller
 * Handles email and WhatsApp sending requests
 */

module.exports = {
  /**
   * Send email via MagicMail router
   */
  async send(ctx) {
    try {
      const emailRouter = strapi.plugin('magic-mail').service('email-router');
      const result = await emailRouter.send(ctx.request.body);

      ctx.body = {
        success: true,
        ...result,
      };
    } catch (err) {
      strapi.log.error('[magic-mail] Error sending email:', err);
      ctx.throw(500, err.message || 'Failed to send email');
    }
  },

  /**
   * Send message via Email or WhatsApp (unified API)
   * POST /api/magic-mail/send-message
   * Body: { channel: 'email' | 'whatsapp' | 'auto', to, phoneNumber, subject, message, ... }
   */
  async sendMessage(ctx) {
    try {
      const emailRouter = strapi.plugin('magic-mail').service('email-router');
      const result = await emailRouter.sendMessage(ctx.request.body);

      ctx.body = {
        success: true,
        ...result,
      };
    } catch (err) {
      strapi.log.error('[magic-mail] Error sending message:', err);
      ctx.throw(500, err.message || 'Failed to send message');
    }
  },

  /**
   * Send WhatsApp message
   * POST /api/magic-mail/send-whatsapp
   * Body: { phoneNumber, message, templateId?, templateData? }
   */
  async sendWhatsApp(ctx) {
    try {
      const emailRouter = strapi.plugin('magic-mail').service('email-router');
      const result = await emailRouter.sendWhatsApp(ctx.request.body);

      ctx.body = {
        success: true,
        ...result,
      };
    } catch (err) {
      strapi.log.error('[magic-mail] Error sending WhatsApp:', err);
      ctx.throw(500, err.message || 'Failed to send WhatsApp message');
    }
  },

  /**
   * Get WhatsApp connection status
   * GET /api/magic-mail/whatsapp/status
   */
  async getWhatsAppStatus(ctx) {
    try {
      const emailRouter = strapi.plugin('magic-mail').service('email-router');
      const status = emailRouter.getWhatsAppStatus();

      ctx.body = {
        success: true,
        data: status,
      };
    } catch (err) {
      strapi.log.error('[magic-mail] Error getting WhatsApp status:', err);
      ctx.body = {
        success: false,
        data: {
          isConnected: false,
          status: 'error',
          error: err.message,
        },
      };
    }
  },

  /**
   * Check if phone number is on WhatsApp
   * GET /api/magic-mail/whatsapp/check/:phoneNumber
   */
  async checkWhatsAppNumber(ctx) {
    try {
      const { phoneNumber } = ctx.params;
      
      if (!phoneNumber) {
        ctx.throw(400, 'Phone number is required');
        return;
      }

      const emailRouter = strapi.plugin('magic-mail').service('email-router');
      const result = await emailRouter.checkWhatsAppNumber(phoneNumber);

      ctx.body = {
        success: true,
        data: result,
      };
    } catch (err) {
      strapi.log.error('[magic-mail] Error checking WhatsApp number:', err);
      ctx.throw(500, err.message || 'Failed to check phone number');
    }
  },
};
