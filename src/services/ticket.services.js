import Services from "./service.manager.js";
import { ticketDao } from "../daos/mongodb/ticket.dao.js";

class TicketService extends Services {
    constructor() {
        super(ticketDao)
    }
}

export const ticketService = new TicketService();