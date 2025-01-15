import Controllers from "./controller.manager.js";
import { ticketService } from "../services/ticket.services.js";

class TicketController extends Controllers {
    constructor() {
        super(ticketService)
    }
}

export const ticketController = new TicketController();
