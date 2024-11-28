import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from 'src/app/firebase/entry.service';
import { Entry } from 'src/app/models/entry.model';
import { AuthService } from 'src/app/firebase/auth.service';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {
  selectedDate: string = new Date().toISOString();
  entries: Entry[] = [];
  highlightedDates: string[] = [];
  locale: string = 'es-ES';

  constructor(
    private entryService: EntryService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEntries();
  }

  loadEntries() {
    this.entryService.getEntries().subscribe((entries) => {
      this.entries = entries;
      this.updateHighlightedDates();
    });
  }

  updateHighlightedDates() {
    this.highlightedDates = this.entries.map((entry) => {
      const date = new Date(entry.date);
      return date.toISOString().split('T')[0];
    });
  }

  onDateSelect(event: any) {
    this.selectedDate = event.detail.value;
    this.router.navigate(['/form'], {
      queryParams: { date: this.selectedDate },
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
