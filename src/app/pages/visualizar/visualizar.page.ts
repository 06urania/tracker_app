import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/firebase/entry.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {
  entries: Entry[] = []; // Aquí se almacenarán las entradas

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.loadEntries();
  }

  loadEntries() {
    this.entryService.getEntries().subscribe((data: Entry[]) => {
      this.entries = data;
    });
  }
}
