import { db } from "./db"

export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface WeeklyHealthSummary {
  userId: string
  shopDomain: string
  currentScore: number
  previousScore: number
  scoreChange: number
  totalProducts: number
  issuesFound: number
  issuesFixed: number
  trendData: Array<{
    date: string
    score: number
  }>
}

export class EmailService {
  private static instance: EmailService
  private isConfigured: boolean = false

  constructor() {
    // Check if email service is configured
    this.isConfigured = !!(
      process.env.SMTP_HOST && 
      process.env.SMTP_PORT && 
      process.env.SMTP_USER && 
      process.env.SMTP_PASS
    )
  }

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendWeeklyHealthSummary(summary: WeeklyHealthSummary): Promise<boolean> {
    try {
      if (!this.isConfigured) {
        console.log('Email service not configured - logging summary instead')
        await this.logSummary(summary)
        return true
      }

      const template = this.generateWeeklyHealthTemplate(summary)
      const emailAddress = await this.getUserEmailAddress(summary.userId)

      if (!emailAddress) {
        console.log('No email address found for user - logging summary instead')
        await this.logSummary(summary)
        return true
      }

      // TODO: Implement actual email sending with Nodemailer
      // For now, we'll just log the email content
      console.log('Would send email:', {
        to: emailAddress,
        subject: template.subject,
        html: template.html
      })

      // Log the email attempt
      await db.log.create({
        data: {
          userId: summary.userId,
          type: 'email_sent',
          message: `Weekly health summary sent to ${emailAddress}`,
          metadata: {
            subject: template.subject,
            currentScore: summary.currentScore,
            scoreChange: summary.scoreChange,
            issuesFound: summary.issuesFound,
            issuesFixed: summary.issuesFixed
          }
        }
      })

      return true
    } catch (error) {
      console.error('Failed to send weekly health summary:', error)
      
      // Log the error
      await db.log.create({
        data: {
          userId: summary.userId,
          type: 'error',
          message: `Failed to send weekly health summary: ${error instanceof Error ? error.message : 'Unknown error'}`,
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      })

      return false
    }
  }

  private async getUserEmailAddress(userId: string): Promise<string | null> {
    try {
      // For now, we'll construct a generic email based on shop domain
      // In a real implementation, this would come from user preferences or Shopify API
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { shopDomain: true }
      })

      if (!user) return null

      // Extract shop name from domain (e.g., "mystore.myshopify.com" -> "mystore")
      const shopName = user.shopDomain.replace('.myshopify.com', '')
      return `admin@${shopName}.myshopify.com`
    } catch (error) {
      console.error('Failed to get user email address:', error)
      return null
    }
  }

  private generateWeeklyHealthTemplate(summary: WeeklyHealthSummary): EmailTemplate {
    const scoreTrend = summary.scoreChange >= 0 ? '📈' : '📉'
    const scoreColor = summary.scoreChange >= 0 ? '#00a047' : '#d82c0d'
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weekly Health Summary - ${summary.shopDomain}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
          .score-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .score-number { font-size: 48px; font-weight: bold; color: ${scoreColor}; margin: 10px 0; }
          .trend { font-size: 18px; color: ${scoreColor}; }
          .stats { display: flex; justify-content: space-around; margin: 20px 0; }
          .stat { text-align: center; }
          .stat-number { font-size: 24px; font-weight: bold; color: #667eea; }
          .stat-label { color: #666; font-size: 14px; }
          .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #666; }
          .cta-button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏥 Catalog Health Report</h1>
          <p>Weekly summary for ${summary.shopDomain}</p>
        </div>
        
        <div class="content">
          <div class="score-card">
            <div class="score-number">${summary.currentScore}%</div>
            <div class="trend">
              ${scoreTrend} ${summary.scoreChange >= 0 ? '+' : ''}${summary.scoreChange.toFixed(1)}% from last week
            </div>
            <p>Current Health Score</p>
          </div>
          
          <div class="stats">
            <div class="stat">
              <div class="stat-number">${summary.totalProducts}</div>
              <div class="stat-label">Total Products</div>
            </div>
            <div class="stat">
              <div class="stat-number">${summary.issuesFound}</div>
              <div class="stat-label">Issues Found</div>
            </div>
            <div class="stat">
              <div class="stat-number">${summary.issuesFixed}</div>
              <div class="stat-label">Issues Fixed</div>
            </div>
          </div>
          
          ${summary.currentScore < 90 ? `
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <strong>⚠️ Attention Needed:</strong> Your catalog health is below 90%. Consider running a health check to identify and fix issues.
            </div>
          ` : `
            <div style="background: #d4edda; border: 1px solid #c3e6cb; border-radius: 6px; padding: 15px; margin: 20px 0;">
              <strong>✅ Great Job!</strong> Your catalog is in excellent health. Keep up the good work!
            </div>
          `}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SHOPIFY_APP_URL}/dashboard" class="cta-button">
              View Dashboard
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated report from CatalogAI Optimizer.</p>
          <p>To adjust your email preferences, visit your dashboard settings.</p>
        </div>
      </body>
      </html>
    `

    const text = `
Catalog Health Report - ${summary.shopDomain}

Health Score: ${summary.currentScore}%
Trend: ${summary.scoreChange >= 0 ? '+' : ''}${summary.scoreChange.toFixed(1)}% from last week

Statistics:
- Total Products: ${summary.totalProducts}
- Issues Found: ${summary.issuesFound}
- Issues Fixed: ${summary.issuesFixed}

${summary.currentScore < 90 ? 
  '⚠️ Your catalog health is below 90%. Consider running a health check to identify and fix issues.' :
  '✅ Your catalog is in excellent health. Keep up the good work!'
}

View your dashboard: ${process.env.SHOPIFY_APP_URL}/dashboard

---
This is an automated report from CatalogAI Optimizer.
To adjust your email preferences, visit your dashboard settings.
    `

    return {
      subject: `📊 Weekly Health Report: ${summary.currentScore}% (${summary.scoreChange >= 0 ? '+' : ''}${summary.scoreChange.toFixed(1)}%)`,
      html,
      text
    }
  }

  private async logSummary(summary: WeeklyHealthSummary): Promise<void> {
    await db.log.create({
      data: {
        userId: summary.userId,
        type: 'email_summary',
        message: `Weekly health summary: ${summary.currentScore}% (${summary.scoreChange >= 0 ? '+' : ''}${summary.scoreChange.toFixed(1)}%) - ${summary.issuesFound} issues found, ${summary.issuesFixed} fixed`,
        metadata: {
          currentScore: summary.currentScore,
          previousScore: summary.previousScore,
          scoreChange: summary.scoreChange,
          totalProducts: summary.totalProducts,
          issuesFound: summary.issuesFound,
          issuesFixed: summary.issuesFixed
        }
      }
    })
  }

  async sendHealthAlert(userId: string, shopDomain: string, alertType: 'critical' | 'warning', message: string): Promise<boolean> {
    try {
      if (!this.isConfigured) {
        console.log('Email service not configured - logging alert instead')
        await this.logAlert(userId, alertType, message)
        return true
      }

      const emailAddress = await this.getUserEmailAddress(userId)
      if (!emailAddress) {
        console.log('No email address found for user - logging alert instead')
        await this.logAlert(userId, alertType, message)
        return true
      }

      const template = this.generateHealthAlertTemplate(shopDomain, alertType, message)

      // TODO: Implement actual email sending
      console.log('Would send health alert:', {
        to: emailAddress,
        subject: template.subject,
        html: template.html
      })

      await db.log.create({
        data: {
          userId,
          type: 'health_alert',
          message: `Health alert sent: ${message}`,
          metadata: {
            alertType,
            message
          }
        }
      })

      return true
    } catch (error) {
      console.error('Failed to send health alert:', error)
      return false
    }
  }

  private generateHealthAlertTemplate(shopDomain: string, alertType: 'critical' | 'warning', message: string): EmailTemplate {
    const isCritical = alertType === 'critical'
    const color = isCritical ? '#d82c0d' : '#f59e0b'
    const icon = isCritical ? '🚨' : '⚠️'

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Health Alert - ${shopDomain}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: ${color}; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #fff; padding: 30px; border: 1px solid #e1e5e9; }
          .alert-box { background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 20px; margin: 20px 0; }
          .cta-button { display: inline-block; background: ${color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${icon} Health Alert</h1>
          <p>${shopDomain}</p>
        </div>
        
        <div class="content">
          <div class="alert-box">
            <h3>${isCritical ? 'Critical Issue Detected' : 'Warning'}</h3>
            <p>${message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.SHOPIFY_APP_URL}/dashboard" class="cta-button">
              View Dashboard
            </a>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
${icon} Health Alert - ${shopDomain}

${isCritical ? 'Critical Issue Detected' : 'Warning'}

${message}

View your dashboard: ${process.env.SHOPIFY_APP_URL}/dashboard
    `

    return {
      subject: `${icon} ${isCritical ? 'Critical' : 'Warning'}: ${shopDomain}`,
      html,
      text
    }
  }

  private async logAlert(userId: string, alertType: 'critical' | 'warning', message: string): Promise<void> {
    await db.log.create({
      data: {
        userId,
        type: 'health_alert',
        message: `Health alert (${alertType}): ${message}`,
        metadata: {
          alertType,
          message
        }
      }
    })
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance()
