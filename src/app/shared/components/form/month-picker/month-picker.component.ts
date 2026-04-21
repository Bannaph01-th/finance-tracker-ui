import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild
} from '@angular/core';
import flatpickr from 'flatpickr';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import { Thai } from 'flatpickr/dist/l10n/th';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-month-picker',
  standalone: true,
  imports: [LabelComponent],
  templateUrl: './month-picker.component.html'
})
export class MonthPickerComponent {
  @Input() id!: string;
  @Input() label?: string;
  @Input() placeholder = 'เลือกเดือน';
  @Input() defaultDate?: string | Date;

  @Output() monthChange = new EventEmitter<{
    selectedDates: Date[];
    dateStr: string;
    instance: flatpickr.Instance;
  }>();

  @ViewChild('monthInput')
  monthInput!: ElementRef<HTMLInputElement>;

  private fp?: flatpickr.Instance;

  ngAfterViewInit() {
    this.fp = flatpickr(this.monthInput.nativeElement, {
      locale: {
        ...Thai,
        weekdays: Thai.weekdays,
        months: Thai.months
      },

      static: true,
      disableMobile: true,
      defaultDate: this.defaultDate,
      clickOpens: true,

      plugins: [
        monthSelectPlugin({
          shorthand: false,
          dateFormat: 'Y-m',
          altFormat: 'F Y',
          theme: 'light'
        })
      ],

      onReady: (selectedDates, _, instance) => {
        this.renderThaiYear(instance);

        if (selectedDates.length) {
          instance.input.value = this.formatThaiMonthYear(selectedDates[0]);
        }
      },

      onMonthChange: (_, __, instance) => {
        this.renderThaiYear(instance);
      },

      onYearChange: (_, __, instance) => {
        this.renderThaiYear(instance);
      },

      onOpen: (_, __, instance) => {
        this.renderThaiYear(instance);
      },

      onChange: (selectedDates, _, instance) => {
        if (!selectedDates.length) return;

        instance.input.value = this.formatThaiMonthYear(selectedDates[0]);

        this.monthChange.emit({
          selectedDates,
          dateStr: instance.formatDate(selectedDates[0], 'Y-m'),
          instance
        });
      }
    });
  }

  private formatThaiMonthYear(date?: Date): string {
    if (!date) return '';

    const month = new Intl.DateTimeFormat('th-TH', {
      month: 'long'
    }).format(date);

    const year = date.getFullYear() + 543;

    return `${month} ${year}`;
  }

  private renderThaiYear(instance: flatpickr.Instance) {
    setTimeout(() => {
      const yearInput = instance.calendarContainer.querySelector(
        '.cur-year'
      ) as HTMLInputElement | null;

      if (!yearInput) return;

      const christianYear = instance.currentYear;
      const buddhistYear = christianYear + 543;

      yearInput.value = String(buddhistYear);

      yearInput.onfocus = () => {
        yearInput.value = String(buddhistYear);
      };

      yearInput.onblur = () => {
        yearInput.value = String(instance.currentYear + 543);
      };

      yearInput.oninput = () => {
        const raw = yearInput.value.replace(/\D/g, '');

        if (raw.length === 4) {
          const newYear = Number(raw) - 543;

          if (newYear > 1900 && newYear < 2600) {
            instance.changeYear(newYear);
            yearInput.value = raw;
          }
        }
      };
    });
  }

  ngOnDestroy() {
    this.fp?.destroy();
  }
}