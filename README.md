Description
===========
Sample Library Management Screen application demonstrating how to create a Spring MVC application with Spring Data MongoDB 

Technologies used:
========
Backend: 
Spring 3.1, JDK 1.6, Maven 3, Unit Tests: Mockito 

Frontend:
AngularJs

IDE:
Intellij IDEA 12

Database:
MongoDB

Functional Specs
========
1. Add Book
2. Update Book
3. Delete Book

In Add Book Function used Captcha Field from Google API "https://developers.google.com/recaptcha/docs/display"

To run this, first you must get key from google "https://www.google.com/recaptcha/admin#createsite"

After get key you must set your key in to "your_public_key" field from webapp/WEB-INF/pages/books.jsp  Line:108
   ```html
107      <script type="text/javascript"
108            src="http://www.google.com/recaptcha/api/challenge?k=your_public_key">
109      </script>
   
   ```
   
   
API Keys

To use reCAPTCHA, you need to sign up for API keys for your site. The keys are unique to the domain or domains you specify, and their respective sub-domains. Specifying more than one domain could come in handy in the case that you serve your website from multiple top level domains (for example: yoursite.com, yoursite.net).

By default, all keys work on "localhost" (or "127.0.0.1"), so you can always develop and test on your local machine.

visit "https://developers.google.com/recaptcha/intro"



Building
========

Preparing the data source

1. Run MongoDB, to download the mongoDB please visit http://www.mongodb.org/downloads

2. There's no need to create any collections because Spring will create them automatically

3. InitMongoService will insert our sample data automatically. If you dont want to use it you can disable from webapp/WEB-INF/spring-data.xml Line:35

 
```xml
35   <bean id="initMongoService" class="com.erdalgunay.library.sevice.InitMongoService" init-method="init"/>
```
