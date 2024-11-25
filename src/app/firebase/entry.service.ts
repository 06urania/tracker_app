import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private entryCollection = collection(this.firestore, 'entry');

  constructor(private firestore: Firestore) {}

  // Obtener todas las entradas
  getEntries(): Observable<Entry[]> {
    return collectionData(this.entryCollection, {
      idField: 'id',
    }) as Observable<Entry[]>;
  }

  // Agregar una nueva entrada
  addEntry(entry: Entry): Promise<void> {
    return addDoc(this.entryCollection, entry).then(() => {
      console.log('Entrada añadida correctamente');
    });
  }

  // Actualizar una entrada existente
  updateEntry(entryId: string, updatedEntry: Partial<Entry>): Promise<void> {
    const entryDoc = doc(this.firestore, `entry/${entryId}`);
    return updateDoc(entryDoc, updatedEntry).then(() => {
      console.log('Entrada actualizada correctamente');
    });
  }

  // Eliminar una entrada
  deleteEntry(entryId: string): Promise<void> {
    const entryDoc = doc(this.firestore, `entry/${entryId}`);
    return deleteDoc(entryDoc).then(() => {
      console.log('Entrada eliminada correctamente');
    });
  }
}
