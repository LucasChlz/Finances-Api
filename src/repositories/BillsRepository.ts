import { EntityRepository, Repository } from "typeorm";
import { Bills } from "../models/Bills";

@EntityRepository(Bills)
class BillsRepository extends Repository<Bills> {}

export { BillsRepository }