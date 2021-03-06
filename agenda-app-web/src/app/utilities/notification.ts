import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar){
    }

    openSnackBarDanger(message, action = '', horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition : MatSnackBarVerticalPosition = 'bottom', duration = 5000){
        this.openSnackBar(message, 'notification-danger', action, horizontalPosition, verticalPosition, duration);
    }

    private openSnackBar(message, color, action, horizontalPosition : MatSnackBarHorizontalPosition, verticalPosition : MatSnackBarVerticalPosition, duration){
        this.snackBar.open(message, action, {
          horizontalPosition:  horizontalPosition,
          verticalPosition: verticalPosition, 
          duration: duration,
          panelClass: [color]
        });
    }
}