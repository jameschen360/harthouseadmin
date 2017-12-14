import { Injectable } from '@angular/core';

declare var $;

@Injectable()
export class NotificationService {
  messageNotify;
  type;

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
    } else if (type === 'danger') {
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
    } else if (type === 'warning') {
      $.notify({
        icon: 'notifications',
        message: 'Image Deleted!'

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

  videoToggleNotification(status) {
    if (status) {
      this.messageNotify = 'Video Content has been enabled';
      this.type = 'success';
    } else {
      this.messageNotify = 'Video Content has been disabled';
      this.type = 'danger';
    }
    $.notify({
      icon: 'notifications',
      message: this.messageNotify

    }, {
        type: this.type,
        timer: 4000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }

  videoSave() {
    $.notify({
      icon: 'notifications',
      message: 'Content published success!'

    }, {
        type: 'success',
        timer: 4000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }



}
