# ===================Attempt 1 ===========================
In this Attempt as you can see Email was sent, However i still got the `Error: Greeting never received`. The email sent can also be seen on the mailtrap dashboard

## Test Email Address `nvispute@gmail.com`

```
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
✅  APP LOADED...
✅  STARTING THE SERVER...
✅  APPLICATION ONLINE ON 'http://localhost:5050'
==== Responce from await mailTransport =====
{
  accepted: [ 'nvispute@gmail.com' ],
  rejected: [],
  ehlo: [
    'PIPELINING',
    'SIZE 31457280',
    'AUTH LOGIN PLAIN',
    'ENHANCEDSTATUSCODES',
    '8BITMIME'
  ],
  envelopeTime: 618,
  messageTime: 223,
  messageSize: 11260,
  response: '250 2.0.0 Ok: queued as 8923a080-e2dc-11ee-0040-f1c09226d40d',
  envelope: { from: 'email-support@getbazzar.in', to: [ 'nvispute@gmail.com' ] },
  messageId: '<da2ff7c3-0e0d-ec7a-cc9d-ff8925e6338e@getbazzar.in>'
}
Logging The result in Controller:
undefined
Error: Greeting never received
    at SMTPConnection._formatError (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:790:19)
    at SMTPConnection._onError (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:776:20)
    at Timeout.<anonymous> (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:710:22)
    at listOnTimeout (node:internal/timers:569:17)
    at process.processTimers (node:internal/timers:512:7) {
  code: 'ETIMEDOUT',
  command: 'CONN'
}
C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:70
      throw new Error("Error sending email: ");
            ^

Error: Error sending email:
    at Email.Send (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:70:13)
    at async Email.SendTestEmail (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:75:5)
    at async C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\app.js:15:18

Node.js v18.16.0
[nodemon] app crashed - waiting for file changes before starting...
```

# ===================Attempt 2 ===========================
In this Attempt No Email was sent and i got the `Error: Greeting never received`.

## Test Email Address `nvispute@gmail.com`

```
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
✅  APP LOADED...
✅  STARTING THE SERVER...
✅  APPLICATION ONLINE ON 'http://localhost:5050'
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
✅  APP LOADED...
✅  STARTING THE SERVER...
✅  APPLICATION ONLINE ON 'http://localhost:5050'
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
✅  APP LOADED...
✅  STARTING THE SERVER...
✅  APPLICATION ONLINE ON 'http://localhost:5050'
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
✅  APP LOADED...
✅  STARTING THE SERVER...
✅  APPLICATION ONLINE ON 'http://localhost:5050'
Error: Greeting never received
    at SMTPConnection._formatError (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:790:19)
    at SMTPConnection._onError (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:776:20)
    at Timeout.<anonymous> (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:710:22)
    at listOnTimeout (node:internal/timers:569:17)
    at process.processTimers (node:internal/timers:512:7) {
  code: 'ETIMEDOUT',
  command: 'CONN'
}
C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:71
      throw new Error("Error sending email: ");
            ^

Error: Error sending email:
    at Email.Send (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:71:13)
    at async Email.SendTestEmail (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:76:5)
    at async C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\app.js:15:18

Node.js v18.16.0
[nodemon] app crashed - waiting for file changes before starting...
```

# ===================Attempt 3 ===========================
In this Attempt No Email was sent and i got the `Error: Greeting never received`.

## Test Email Address `nvispute@getbazzar.in`

```
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`
✅  APP LOADED...
✅  STARTING THE SERVER...
✅  APPLICATION ONLINE ON 'http://localhost:5050'
Error: Greeting never received
    at SMTPConnection._formatError (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:790:19)
    at SMTPConnection._onError (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:776:20)   
    at Timeout.<anonymous> (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\node_modules\nodemailer\lib\smtp-connection\index.js:710:22)       
    at listOnTimeout (node:internal/timers:569:17)
    at process.processTimers (node:internal/timers:512:7) {
  code: 'ETIMEDOUT',
  command: 'CONN'
}
C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:71
      throw new Error("Error sending email: ");
            ^

Error: Error sending email:
    at Email.Send (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:71:13)
    at async Email.SendTestEmail (C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\Services\email.js:76:5)
    at async C:\Users\Lenovo\Desktop\mailtrap.io\Email testing\app.js:18:18

Node.js v18.16.0
[nodemon] app crashed - waiting for file changes before starting...

```
