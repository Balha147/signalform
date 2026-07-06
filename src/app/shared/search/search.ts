import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
})
export class Search {
  filter = model.required<string>({
    alias: 'filterCriteria'
  });
}
