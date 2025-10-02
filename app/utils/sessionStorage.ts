/**
 * Temporary in-memory session storage for Railway deployment
 * This bypasses the Prisma session table requirement
 */

import { Session } from "@shopify/shopify-api"

export class InMemorySessionStorage {
  private sessions: Map<string, Session> = new Map()

  async storeSession(session: Session): Promise<boolean> {
    try {
      this.sessions.set(session.id, session)
      return true
    } catch (error) {
      console.error('Error storing session:', error)
      return false
    }
  }

  async loadSession(id: string): Promise<Session | undefined> {
    try {
      return this.sessions.get(id)
    } catch (error) {
      console.error('Error loading session:', error)
      return undefined
    }
  }

  async deleteSession(id: string): Promise<boolean> {
    try {
      return this.sessions.delete(id)
    } catch (error) {
      console.error('Error deleting session:', error)
      return false
    }
  }

  async deleteSessions(ids: string[]): Promise<boolean> {
    try {
      ids.forEach(id => this.sessions.delete(id))
      return true
    } catch (error) {
      console.error('Error deleting sessions:', error)
      return false
    }
  }

  async findSessionsByShop(shop: string): Promise<Session[]> {
    try {
      const sessions: Session[] = []
      for (const session of this.sessions.values()) {
        if (session.shop === shop) {
          sessions.push(session)
        }
      }
      return sessions
    } catch (error) {
      console.error('Error finding sessions by shop:', error)
      return []
    }
  }
}
