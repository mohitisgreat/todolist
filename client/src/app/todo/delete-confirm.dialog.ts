import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  template: `
    <h3 style="mat-h3">Delete confirmation</h3>
    <p>Are you sure want to remove this todo?</p>
    <button mat-button (click)="onYes()">Yes</button>
    <button mat-button (click)="onNo()">No</button>
  `,
})
export class DeleteConfirmDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  onYes() {
    this.dialogRef.close('yes');
  }

  onNo() {
    this.dialogRef.close('no');
  }
}
