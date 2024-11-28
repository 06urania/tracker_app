import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/firebase/entry.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.loadEntries();
  }

  loadEntries() {
    this.entryService.getEntries().subscribe((data: Entry[]) => {
      this.entries = data.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  }

  formatDate(date: any): string {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
