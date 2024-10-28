import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(public dialog: MatDialog) { }

  dialogOpen = false;

  openDialog(): void {

    if (!this.dialogOpen) {
      this.dialogOpen = true;

      const dialogRef = this.dialog.open(AuthComponent, {
        closeOnNavigation: true,
        height: 'auto',

      });

      dialogRef.afterClosed().subscribe(() => {
        this.dialogOpen = false; // Reset dialogOpen when dialog is closed
      });
    }

  }

}
