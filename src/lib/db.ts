import Dexie, { Table } from 'dexie'
import { Biodata } from './type'

export class BiodataDB extends Dexie {
  biodata!: Table<Biodata, string>

  constructor() {
    super('BiodataDB')
    this.version(1).stores({
      biodata: 'id', // id is the primary key
    })
  }
}

export const db = new BiodataDB()
