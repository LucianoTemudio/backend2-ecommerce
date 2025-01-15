import { TicketModel } from "../models/ticket.model.js";
import MongoDao from "./mongo.dao.js";

class TicketMongoDao extends MongoDao {
    constructor() {
        super(TicketModel)
    }
}

export const ticketDao = new TicketMongoDao();