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
          timer: 2000,
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
          timer: 2000,
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
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    }
  }

  showNotificationPDF(type) {
    if (type === 'success') {
      $.notify({
        icon: 'notifications',
        message: 'Pdf upload success!'

      }, {
          type: type,
          timer: 2000,
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
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    } else if (type === 'warning') {
      $.notify({
        icon: 'notifications',
        message: 'Pdf Deleted!'

      }, {
          type: type,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    }
  }

  reservationNotification(type) {
    if (type === 'success') {
      $.notify({
        icon: 'notifications',
        message: 'Reservation was confirmed and an email was sent!'

      }, {
          type: type,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    } else if (type === 'danger') {
      $.notify({
        icon: 'notifications',
        message: 'Reservation data was deleted!'

      }, {
          type: type,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    } else if (type === 'warning') {
      $.notify({
        icon: 'notifications',
        message: 'Something went wrong!'

      }, {
          type: type,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    }
  }

  cweventSaveEditNotification(type) {
    if (type === 'success') {
      $.notify({
        icon: 'notifications',
        message: 'Information was saved!'

      }, {
          type: type,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    } else if (type === 'danger') {
      $.notify({
        icon: 'notifications',
        message: 'Information was deleted!'

      }, {
          type: type,
          timer: 2000,
          placement: {
            from: 'top',
            align: 'center'
          }
        });
    } else if (type === 'warning') {
      $.notify({
        icon: 'notifications',
        message: 'Something went wrong!'

      }, {
          type: type,
          timer: 2000,
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
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }

  chefToggleNotification(status) {
    if (status) {
      this.messageNotify = 'Chef profile has been enabled';
      this.type = 'success';
    } else {
      this.messageNotify = 'Chef profile has been disabled';
      this.type = 'danger';
    }
    $.notify({
      icon: 'notifications',
      message: this.messageNotify

    }, {
        type: this.type,
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }

  galleryRemoveNotification(status) {
    if (status) {
      // this.messageNotify = 'Gallery photo has been removed';
      // this.type = 'danger';
    } else {
      this.messageNotify = 'Gallery photo has been removed';
      this.type = 'success';
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


  }

  videoSave() {
    $.notify({
      icon: 'notifications',
      message: 'Content published success!'

    }, {
        type: 'success',
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }

  aboutUsSave() {
    $.notify({
      icon: 'notifications',
      message: 'About Us content saved!'

    }, {
        type: 'success',
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }

  chefSave() {
    $.notify({
      icon: 'notifications',
      message: 'Chef Content Saved!'

    }, {
        type: 'success',
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });

  }

  error() {
    $.notify({
      icon: 'notifications',
      message: 'Error.'

    }, {
        type: 'danger',
        timer: 2000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
  }



}
