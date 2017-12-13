import { Injectable } from '@angular/core';

declare var $;

@Injectable()
export class NotificationService {

  showNotification(type) {
    if (type === 'success') {
      $.notify({
        icon: 'notifications',
        message: 'Image upload success!'

      }, {
          type: type,
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    } else {
      $.notify({
        icon: 'notifications',
        message: 'Something went wrong!'

      }, {
          type: type,
          timer: 4000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    }
  }



}
