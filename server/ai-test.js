import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI(
    {apiKey: process.env.AI_API_KEY}
);

const submission = [
    "glowgod/about.html<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>About</title>\r\n    <link rel=\"stylesheet\" href=\"style.css\" />\r\n  </head>\r\n  <body>\r\n    <header id=\"header\">\r\n      <nav class=\"main-nav\">\r\n        <ul>\r\n          <li><a href=\"index.html\">Home</a></li>\r\n          <li><a href=\"resume.html\">Resume</a></li>\r\n          <li><a href=\"portfolio.html\">Portfolio</a></li>\r\n          <li><a href=\"about.html\">About</a></li>\r\n          <li><a href=\"contact.html\">Contact</a></li>\r\n        </ul>\r\n      </nav>\r\n    </header>\r\n    <main>\r\n      <h1>About</h1>\r\n      <section>\r\n        <h2>Oblig 1: Preperation process and semantic tags</h2>\r\n        <h3>Preparation</h3>\r\n        <p>\r\n          In the preparation process of this project, I made a sketch for each\r\n          page using PowerPoint. All the pages have a few established semantic\r\n          structural elements. The &lt;header&gt; contains a &lt;nav&gt; element\r\n          that link all five pages. I used nav in the &lt;header&gt; that\r\n          contains a &lt;ul&gt; in which contains the links/descriptions. I used\r\n          &lt;main&gt; in every page to display the main content. Lastly, I used\r\n          a &lt;footer&gt; at the bottom section of every page. It defines the\r\n          bottom of the page. In addition, most of the pages are littered with\r\n          different semantic elements to enrichen, add context, and provide\r\n          extra information about the content. <em>None</em> of these are used\r\n          for styling.\r\n        </p>\r\n\r\n        <h3>Directory structure</h3>\r\n        <p>\r\n          For this project I used one root folder that contain all\r\n          <abbr title=\"Hypertext Markup Language\">HTML</abbr>\r\n          documents and the\r\n          <abbr title=\"Cascading Style Sheets\">CSS</abbr> style document. For\r\n          images, I created an own folder within the root folder meant only for\r\n          images. I chose this structure due to the small size of the website.\r\n          It is way easier to link between pages and images. Due to the small\r\n          number of documents, it is effortless to navigate the sidebar in\r\n          VSCode. I do still realize that for a bigger project, I would divide\r\n          the files into categories and even sub-websites.\r\n        </p>\r\n\r\n        <h3><a href=\"#home-page\">Home Page</a></h3>\r\n        <p>\r\n          My home page consists of one &lt;section&gt; element and an\r\n          &lt;aside&gt; element inside a &lt;main&gt; element. The\r\n          &lt;section&gt; displays the dominant content of the home page. It\r\n          contains a &lt;figure&gt; with an &lt;img&gt; and a &lt;figcaption&gt;\r\n          that supplements the image. Under the &lt;figure&gt; lies an\r\n          &lt;h2&gt;, a &lt;p&gt; introducing \"me\" and a &lt;ul&gt; that sums up\r\n          my hobbies. The &lt;aside&gt; element contains a quote from my\r\n          favourite movie. I displayed the quote using a &lt;figure&gt; with a\r\n          &lt;blockquote&gt; that contains the main quote. I used a\r\n          &lt;figcaption&gt; and &lt;cite&gt; element with a nested anchor\r\n          element that links the movies\r\n          <abbr title=\"Internet Movie Database\">IMDb</abbr> page.\r\n        </p>\r\n        <h3><a href=\"#resume-page\">Resume</a></h3>\r\n        <p>\r\n          The resume page is divided into a &lt;section&gt;, &lt;aside&gt; and\r\n          &lt;article&gt; element within a &lt;main&gt; element containing an\r\n          &lt;h1&gt;. The &lt;section&gt; includes two &lt;p&gt; elements and\r\n          &lt;h2&gt; elements describing academic background and work\r\n          experience. The &lt;aside&gt; displays a &lt;figure&gt; with an\r\n          &lt;img&gt; and &lt;figcaption&gt; that shows me working while smiling\r\n          mysteriously. I put this in an &lt;aside&gt; due to it being related\r\n          to the main content of the page.\r\n        </p>\r\n\r\n        <p>\r\n          The &lt;article&gt; contains two &lt;div&gt; elements which contains a\r\n          &lt;ul&gt; element in each which are lined up horizontally. I used an\r\n          &lt;article&gt; here du to it using the same structure as in some\r\n          other pages in the project. Additionally, they hold self-contained\r\n          content, in this case being lists of languages and skills. The skills\r\n          list includes a nested &lt;ul&gt; that filter the different web dev\r\n          tools I use.\r\n        </p>\r\n        <h3><a href=\"#portfolio-page\">Portfolio</a></h3>\r\n        <p>\r\n          The portfolio page consists of three &lt;article&gt; elements inside a\r\n          &lt;main&gt; element. Each article contains the same reusable style as\r\n          in the\r\n          <a href=\"#resume-page\">resume page</a>. The article contains a two\r\n          &lt;div&gt; elements which are used for styling purposes. The two\r\n          &lt;div&gt; elements contains an &lt;img&gt; of a project in addition\r\n          to an &lt;h2&gt; and &lt;p&gt; element that describe the &lt;img&gt;.\r\n          The last &lt;article&gt; also includes an &lt;ol&gt; that describes\r\n          the recipe for a great beer chicken.\r\n        </p>\r\n        <h3><a href=\"#contact-page\">Contact</a></h3>\r\n        <p>\r\n          The &lt;contact&gt; page consists of three &lt;div&gt; elements and an\r\n          address element in a &lt;section&gt; element. All within a\r\n          &lt;main&gt; element. I used a section due to it being a standalone\r\n          section of the document. The three &lt;div&gt; elements are lined up\r\n          horizontally and are all made up of an &lt;img&gt; element and\r\n          &lt;a&gt; element. These link to their respective social media sites.\r\n          Under them there is an &lt;address&gt; element which displays an\r\n          address and two &lt;a&gt; elements which supplies the user with a\r\n          direct mail and phone link.\r\n        </p>\r\n        <h3><a href=\"#about-page\">About</a></h3>\r\n        <p>\r\n          My about page is made up of two &lt;section&gt; elements inside a\r\n          &lt;main&gt; element. An &lt;h1&gt; element marks the heading of the\r\n          main page. The first &lt;sections&gt; is headed by an &lt;h2&gt;\r\n          element and contains at least one &lt;h3&gt; and &lt;p&gt; element\r\n          which explains the structure of each page. Additionally, each\r\n          &lt;h3&gt; element representing a page can be clicked. The user will\r\n          then automatically be referred to that very sketch linking an\r\n          &lt;a&gt; element with an &lt;id&gt; element. The second\r\n          &lt;section&gt; contains five &lt;figure&gt; elements, each of which\r\n          contains an &lt;img&gt; of a sketch end a &lt;figcaption&gt; referring\r\n          to the sketch above.\r\n        </p>\r\n      </section>\r\n      <section>\r\n        <h2>These are my sketches for the project</h2>\r\n        <figure id=\"home-page\">\r\n          <img\r\n            src=\"./images/sketch-home.JPG\"\r\n            alt=\"a screen capture of home page sketch\"\r\n            class=\"sketch\"\r\n          />\r\n          <figcaption class=\"sketch-cap\">Sketch of home page.</figcaption>\r\n        </figure>\r\n        <figure id=\"resume-page\">\r\n          <img\r\n            src=\"./images/sketch-resume.JPG\"\r\n            alt=\"a screen capture of resume page sketch\"\r\n            class=\"sketch\"\r\n          />\r\n          <figcaption class=\"sketch-cap\">Sketch of resume/CV page.</figcaption>\r\n        </figure>\r\n        <figure id=\"portfolio-page\">\r\n          <img\r\n            src=\"./images/sketch-portfolio.JPG\"\r\n            alt=\"a screen capture of portfolio page sketch\"\r\n            class=\"sketch\"\r\n          />\r\n          <figcaption class=\"sketch-cap\">Sketch of Portfolio page.</figcaption>\r\n        </figure>\r\n        <figure id=\"about-page\">\r\n          <img\r\n            src=\"./images/sketch-about.JPG\"\r\n            alt=\"a screen capture of about page sketch\"\r\n            class=\"sketch\"\r\n          />\r\n          <figcaption class=\"sketch-cap\">Sketch of About page.</figcaption>\r\n        </figure>\r\n        <figure id=\"contact-page\">\r\n          <img\r\n            src=\"./images/sketch-contact.JPG\"\r\n            alt=\"a screen capture of contact page sketch\"\r\n            class=\"sketch\"\r\n          />\r\n          <figcaption class=\"sketch-cap\">Sketch of Contact page.</figcaption>\r\n        </figure>\r\n      </section>\r\n    </main>\r\n    <footer>\r\n      <p>Oblig 1 - IDG1292</p>\r\n    </footer>\r\n  </body>\r\n</html>\r\n",
    "glowgod/contact.html<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>Contact Info</title>\r\n    <link rel=\"stylesheet\" href=\"style.css\" />\r\n  </head>\r\n  <body>\r\n    <header id=\"header\">\r\n      <nav class=\"main-nav\">\r\n        <ul>\r\n          <li><a href=\"index.html\">Home</a></li>\r\n          <li><a href=\"resume.html\">Resume</a></li>\r\n          <li><a href=\"portfolio.html\">Portfolio</a></li>\r\n          <li><a href=\"about.html\">About</a></li>\r\n          <li><a href=\"contact.html\">Contact</a></li>\r\n        </ul>\r\n      </nav>\r\n    </header>\r\n    <main>\r\n      <section>\r\n        <h1>Contact</h1>\r\n        <div class=\"logo-container\">\r\n          <a href=\"https://www.instagram.com/\" target=\"_blank\">\r\n            <img\r\n              class=\"logo\"\r\n              src=\"./images/Instagram-logo.webp\"\r\n              alt=\"instagram logo\"\r\n          /></a>\r\n        </div>\r\n        <div class=\"logo-container\">\r\n          <a href=\"https://www.facebook.com/\" target=\"_blank\">\r\n            <img\r\n              class=\"logo\"\r\n              src=\"./images/facebook-logo.webp\"\r\n              alt=\"facebook logo\"\r\n          /></a>\r\n        </div>\r\n\r\n        <div class=\"logo-container\">\r\n          <a href=\"https://www.linkedin.com/\" target=\"_blank\">\r\n            <img\r\n              class=\"logo\"\r\n              src=\"./images/linkedin-logo.png\"\r\n              alt=\"linkedin logo\"\r\n          /></a>\r\n        </div>\r\n\r\n        <!-- Fake phone number and mail, i used ttps://temp-mail.org/ and https://fakenumber.org/norway.php -->\r\n\r\n        <address>\r\n          Teknologivegen 22, 2815 Gjøvik <br />\r\n          Mail:\r\n          <a href=\"mailto:jabad69440@dnitem.com\">jabad69440@dnitem.com</a>\r\n          <br />\r\n          Tlf:\r\n          <a href=\"tel:48250780\">48250780</a>\r\n        </address>\r\n      </section>\r\n    </main>\r\n    <footer>\r\n      <p>Oblig 1 - IDG1292</p>\r\n    </footer>\r\n  </body>\r\n</html>\r\n",
    "glowgod/index.html<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>Home</title>\r\n    <link rel=\"stylesheet\" href=\"style.css\" />\r\n  </head>\r\n  <body>\r\n    <header id=\"header\">\r\n      <nav class=\"main-nav\">\r\n        <ul>\r\n          <li><a href=\"index.html\">Home</a></li>\r\n          <li><a href=\"resume.html\">Resume</a></li>\r\n          <li><a href=\"portfolio.html\">Portfolio</a></li>\r\n          <li><a href=\"about.html\">About</a></li>\r\n          <li><a href=\"contact.html\">Contact</a></li>\r\n        </ul>\r\n      </nav>\r\n    </header>\r\n    <main>\r\n      <section>\r\n        <h1>Andreas Christiansen</h1>\r\n        <figure class=\"main-fig\">\r\n          <img\r\n            src=\"./images/home.jpg\"\r\n            alt=\"Image of Andreas in front of a fjord\"\r\n            class=\"home-img\"\r\n          />\r\n          <figcaption class=\"fig-cap-main\">\r\n            This is me on preikestolen, just fourty minutes(and a short hike)\r\n            from my hometown, Stavanger.\r\n          </figcaption>\r\n        </figure>\r\n\r\n        <h2>Introduction</h2>\r\n        <p>\r\n          Hello, I’m Andreas. I just finished my 1<sup>st</sup> year of year at\r\n          <abbr title=\"Norwegian University of Science and Technology\"\r\n            >NTNU</abbr\r\n          >\r\n          Gjøvik where I study to become a web developer. I am currently looking\r\n          for a summer job as a web designer. I currently reside in Gjøvik, a\r\n          small city north of Oslo. However, I can work anywhere, either on site\r\n          or remotely.\r\n        </p>\r\n        <h2>In my spare time i enjoy</h2>\r\n        <ul>\r\n          <li>Climbing/Bouldering</li>\r\n          <li>Taking care of my fish</li>\r\n          <li>Long distance running</li>\r\n          <li>Watching the same movies over and over</li>\r\n        </ul>\r\n      </section>\r\n      <aside class=\"np-quote\">\r\n        <figure>\r\n          <blockquote>\r\n            <p>\r\n              \"I'm Rex, founder of the Rex Kwan Do self-defense system! After\r\n              one week with me in my dojo, you'll be prepared to defend yourself\r\n              with the STRENGTH of a grizzly, the reflexes of a PUMA, and the\r\n              wisdom of a man.\"\r\n            </p>\r\n          </blockquote>\r\n          <figcaption>\r\n            Quote from the movie\r\n            <cite>\r\n              <a\r\n                href=\"https://www.imdb.com/title/tt0374900/?ref_=ttqt_qt_tt\"\r\n                target=\"_blank\"\r\n                class=\"movie-link\"\r\n                >Napoleon Dynamite</a\r\n              >\r\n            </cite>\r\n            by Jared Hess.\r\n          </figcaption>\r\n        </figure>\r\n      </aside>\r\n    </main>\r\n    <footer>\r\n      <p>Oblig 1 - IDG1292</p>\r\n    </footer>\r\n  </body>\r\n</html>\r\n",
    "glowgod/portfolio.html<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>Portfolio</title>\r\n    <link rel=\"stylesheet\" href=\"style.css\" />\r\n  </head>\r\n  <body>\r\n    <header id=\"header\">\r\n      <nav class=\"main-nav\">\r\n        <ul>\r\n          <li><a href=\"index.html\">Home</a></li>\r\n          <li><a href=\"resume.html\">Resume</a></li>\r\n          <li><a href=\"portfolio.html\">Portfolio</a></li>\r\n          <li><a href=\"about.html\">About</a></li>\r\n          <li><a href=\"contact.html\">Contact</a></li>\r\n        </ul>\r\n      </nav>\r\n    </header>\r\n    <main>\r\n      <article class=\"card\">\r\n        <h1>Portfolio</h1>\r\n        <div class=\"left\">\r\n          <h2>Digital Frontpage</h2>\r\n          <p>\r\n            This is a digital front page I did of a fictional rock-climbing\r\n            magazine. I made it using Adobe InDesign. The photo I used is of the\r\n            famous rock climber Alex Honnold. Alex is famous for “free soloing”\r\n            El-Capitan, which is portrayed in the documentary “Free Solo”.\r\n          </p>\r\n        </div>\r\n        <div class=\"right\">\r\n          <img\r\n            src=\"./images/digital-frontpage.png\"\r\n            alt=\"magazinecover of climber hanging of cliff\"\r\n            class=\"img-portfolio\"\r\n          />\r\n        </div>\r\n      </article>\r\n\r\n      <article class=\"card\">\r\n        <div class=\"left\">\r\n          <h2>Mood Board</h2>\r\n          <p>\r\n            This is the mood board I made for my magazine cover. It contains a\r\n            collage of different graphical elements that inspired the final\r\n            rendition of the cover. Due to my idea being a fake climbing\r\n            magazine I found inspiration from different “outdoorsy” type\r\n            magazines and pictures.\r\n          </p>\r\n        </div>\r\n        <div class=\"right\">\r\n          <img\r\n            src=\"./images/moodboard.JPG\"\r\n            alt=\"mood board of climbers, fisherman and skier for magazine cover\"\r\n            class=\"img-mood\"\r\n          />\r\n        </div>\r\n      </article>\r\n      <article class=\"card\">\r\n        <div class=\"left\">\r\n          <h2>Beer Chicken</h2>\r\n          <p>\r\n            This is the killer beer chicken I made in 2019. This is how I made\r\n            it:\r\n          </p>\r\n          <ol>\r\n            <li>Rub the chicken with a spice mixture of your choice.</li>\r\n            <li>Drink half of the beer and cut the top of the can off.</li>\r\n            <li>Put some spice mixture in the beer.</li>\r\n            <li>Gently insert the beer into the chicken.</li>\r\n            <li>Cook the chicken for 80 minutes at 220 degrees Celsius.</li>\r\n            <li>Let that boy rest for five minutes.</li>\r\n            <li>Eat the chicken.</li>\r\n          </ol>\r\n        </div>\r\n        <div class=\"right\">\r\n          <img\r\n            src=\"./images/chicken.jpg\"\r\n            alt=\"picture of a beer chicken i made\"\r\n            class=\"img-portfolio\"\r\n          />\r\n        </div>\r\n      </article>\r\n    </main>\r\n    <footer>\r\n      <p>Oblig 1 - IDG1292</p>\r\n    </footer>\r\n  </body>\r\n</html>\r\n",
    "glowgod/resume.html<!DOCTYPE html>\r\n<html lang=\"en\">\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>Resume</title>\r\n    <link rel=\"stylesheet\" href=\"style.css\" />\r\n  </head>\r\n  <body>\r\n    <header id=\"header\">\r\n      <nav class=\"main-nav\">\r\n        <ul>\r\n          <li><a href=\"index.html\">Home</a></li>\r\n          <li><a href=\"resume.html\">Resume</a></li>\r\n          <li><a href=\"portfolio.html\">Portfolio</a></li>\r\n          <li><a href=\"about.html\">About</a></li>\r\n          <li><a href=\"contact.html\">Contact</a></li>\r\n        </ul>\r\n      </nav>\r\n    </header>\r\n    <main>\r\n      <h1>Resume</h1>\r\n      <section>\r\n        <h2>Academic Background</h2>\r\n        <p>\r\n          In my upbringing I went through seven years of primary school and 3\r\n          years of secondary school. In high school I went to a St.Svithun\r\n          videregående, where I took specialization in general studies. After\r\n          that I went through different courses through work and the army, but\r\n          those weere more related to work than education.\r\n        </p>\r\n\r\n        <h2>Work experince</h2>\r\n        <p>\r\n          From my 3 <sup>rd</sup> year in high school until last summer, I\r\n          worked for <abbr title=\"Canadian Helicopter Corporation\">CHC</abbr> as\r\n          a Traffick coordinator at Sola Heliport. Sola Heliport is specialised\r\n          airport in which helicopters transport offshore workers to oil rigs\r\n          near the southwest region of Norway. Additionally, it functions as a\r\n          hub for search and rescue missions. My role contained different\r\n          administrative tasks relating to ground operations.\r\n        </p>\r\n        <p>\r\n          In 2020 I was enlisted in the army and was stationed at\r\n          <abbr title=\"Garnisonen i Sør Varanger\">GSV</abbr> which is located\r\n          near the border between Russia and Norway. There I had many different\r\n          experiences and took a lot of courses. After the army I worked at the\r\n          heliport for one and a half year before I began my studies in web\r\n          development.\r\n        </p>\r\n      </section>\r\n      <aside>\r\n        <figure>\r\n          <img\r\n            src=\"./images/me-at-work.jpg\"\r\n            alt=\"picture of Andreas working hard\"\r\n            class=\"work-img\"\r\n          />\r\n          <figcaption class=\"fig-cap-main\">\r\n            I usually work with a mysterious, yet slightly anxious smile.\r\n          </figcaption>\r\n        </figure>\r\n      </aside>\r\n      <article class=\"card\">\r\n        <div class=\"right\">\r\n          <h2>Skills</h2>\r\n          <ul class=\"resume-list\">\r\n            <li>I can work well both independently and in groups.</li>\r\n            <li>\r\n              I have a good grasp several design and development tools:\r\n              <ul>\r\n                <li><abbr title=\"Hypertext Markup Language\">HTML</abbr></li>\r\n                <li><abbr title=\"Cascading Style Sheets\">CSS</abbr></li>\r\n                <li>Indesign</li>\r\n                <li>Photoshop</li>\r\n                <li>Linux, mainly scrips and simple commands</li>\r\n                <li>\r\n                  All applications of <abbr title=\"Microsoft\">MS</abbr> Office\r\n                </li>\r\n              </ul>\r\n            </li>\r\n\r\n            <li>I can make a <em>splendid</em> grilled cheese sandwitch.</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"left\">\r\n          <h2>Languages i speak</h2>\r\n          <ul class=\"resume-list\">\r\n            <li>Norwegian</li>\r\n            <li>English</li>\r\n            <li>Some german</li>\r\n          </ul>\r\n        </div>\r\n      </article>\r\n    </main>\r\n    <footer>\r\n      <p>Oblig 1 - IDG1292</p>\r\n    </footer>\r\n  </body>\r\n</html>\r\n",
    "glowgod/style.css/* standard styling for general/universial elements start*/\r\n\r\n/* I chose arial due to its readability and popularity */\r\n\r\n* {\r\n    font-family: Arial, Helvetica, sans-serif;\r\n    \r\n}\r\n\r\n\r\nhtml, body {\r\n    margin: 0;\r\n    padding: 0;\r\n    \r\n}\r\n\r\n\r\nbody {\r\n    margin: 0 auto;\r\n    max-width: 750px;\r\n    color: white;\r\n    background-color: black;\r\n    font-size: 18px;\r\n    line-height: 140%;\r\n\r\n}\r\n\r\n/* standard styling for general/universial elements end*/\r\n\r\n/* header/navigation section start */\r\n\r\n#header {\r\n    background-color: rgb(0, 0, 0);\r\n    font-size: 1.3em;\r\n    text-align: center;\r\n    \r\n\r\n}\r\n\r\n\r\n#header ul {\r\n    display: inline-block;\r\n   \r\n}\r\n\r\n\r\n#header ul > li {\r\n    display: inline-block;\r\n    margin-right: 0.7em;\r\n}\r\n\r\n\r\n.main-nav {\r\n    font-size: large;\r\n}\r\n\r\n\r\n.main-nav a:hover {\r\nbackground-color: rgba(255, 255, 255, 0.4);\r\n}\r\n\r\n\r\n.main-nav a {\r\n    text-decoration: none;\r\n    color: white;\r\n}\r\n\r\n/* header/navigation section end */\r\n\r\n.home-img {\r\n    height: 420px;\r\n    width: 420px;\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    border-radius: 10%;\r\n}\r\n\r\n/* standard heading styles start*/\r\nh1 {\r\n    text-align: center;\r\n    margin: 0 0 25px 0;\r\n}\r\n\r\n\r\nh2 {\r\n    text-align: center;\r\n}\r\n\r\n/* standard heading styles end*/\r\n\r\n\r\n\r\n.fig-cap-main {\r\n    text-align: center;\r\n    margin-top: 15px;\r\n    margin-bottom: 40px;\r\n}\r\n\r\n/* quote style start*/\r\n\r\n.np-quote {\r\n\r\n    margin-top: 70px;\r\n}\r\n\r\n\r\n.np-quote p {\r\n    font-style: italic;\r\n}\r\n\r\n\r\n.movie-link {\r\n    color: white;\r\n}\r\n\r\n/* quote style end*/\r\n\r\n/* footer style start*/\r\n\r\nfooter {\r\n    background-color: rgb(0, 0, 0);\r\n    font-size: 1em;\r\n    text-align: center;\r\n    font-style: italic;\r\n    color: white;\r\n    margin: 30px;\r\n}\r\n\r\n/* i used this code to create the line between footer and main content (while not using <hr>)*/\r\nfooter::before {\r\n    content: \"\";\r\n    margin: 2rem 0;\r\n    display: block;\r\n    border-top: 1px solid white;\r\n    \r\n}\r\n\r\n/* footer style end*/\r\n\r\n\r\n/* veretically aligned style, used in both home and portfolio page start*/\r\n\r\n.card {\r\n    background: black;\r\n    box-sizing: border-box;\r\n    text-align: left;\r\n    \r\n}\r\n\r\n\r\n.card > div {\r\n    vertical-align: top;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.card > div.left, .card > div.right {\r\n    height: 100%;\r\n    width: 45%;\r\n    \r\n}\r\n\r\n\r\n.card > .left > h2, .card > .right > h2 {\r\n    text-align: left;\r\n}\r\n\r\n/* veretically aligned style, used in resume and portfolio page end*/\r\n\r\n/* styling used for the lists in resume page start*/\r\n\r\n.resume-list {\r\n    list-style: none;\r\n    padding: 5%;\r\n    \r\n}\r\n\r\n\r\n.resume-list li {\r\n    margin: 7px 0; \r\n}\r\n\r\n\r\n.work-img {\r\n    height: 380px;\r\n    width: 220px;\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    border-radius: 2%;\r\n}\r\n\r\n/* styling used for the lists in resume page end*/\r\n\r\n/* styling used for conatct page start*/\r\n\r\n.logo-container {\r\n    display: inline-block;\r\n    margin: 20px; \r\n}\r\n\r\n\r\n.logo {\r\n    width: 140px;\r\n    height: 140px;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    border-radius: 5%;\r\n    padding: 20px;\r\n    \r\n}\r\n\r\n\r\n.logo:hover {\r\n    background-color: rgba(255, 255, 255, 0.4);\r\n    }\r\n\r\n\r\naddress {\r\n        \r\n    padding: 20px 0;\r\n    background-color: rgb(38, 38, 38);\r\n    max-width: 350px;\r\n    text-align: center;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    font-size: 1.2em;\r\n        \r\n    }\r\naddress a {\r\n    color: cyan;\r\n}\r\n\r\n/* styling used for conatct page end*/\r\n\r\n/* styling used for portfolio page start*/\r\n\r\n.img-portfolio {\r\n    width: 280px;\r\n    height: 400px;\r\n    margin: 15px;\r\n}\r\n\r\n/* I created a class specifically for mood board due to its shape whitch is unlike the others */\r\n\r\n.img-mood {\r\n    width: 360px;\r\n    height: 290px;\r\n    margin: 15px;\r\n}\r\n\r\n\r\n.right img {\r\n    margin: 10px;\r\n}\r\n\r\n\r\n.sketch  {\r\n    width: 290px;\r\n    height: 400px;\r\n    display: block;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n\r\n}\r\n\r\n\r\n.sketch-cap {\r\n    text-align: center;\r\n    margin: 10px 0 50px 0;\r\n    font-size: 1.2em;\r\n}\r\n\r\n/* styling used for portfolio page end*/\r\n\r\n/* styling used for about page start*/\r\n\r\nh3 a {\r\n    color: white;\r\n    \r\n}\r\n\r\n\r\nh3 {\r\n    text-align: center;\r\n}\r\n\r\n\r\n p  a {\r\n    color: white;\r\n    \r\n}\r\n\r\n/* styling used for about page end*/\r\n\r\n\r\n\r\n"
  ]
  const submissionString = submission.join('');


  const assignmentDetails = `Oblig#1
  Write your personal page
  Due date: check Blackboard
  IDG1292-FALL2022
  Table of Contents
  Preface ....................................................................................................... 3
  Context ...................................................................................................... 4
  Task description ........................................................................................ 5
  Required .................................................................................................... 7
  Tips ........................................................................................................... 9
  Other resources.........................................................................................10
  Deliverables ..............................................................................................11
  
  Preface
  This document describes the first compulsory task (oblig#1) of the course. The
  focus of the task is to create a coherent HTML structure and reflect on the choices
  taken during the design and implementation phases. CSS is allowed and you are
  encouraged to use anything learnt between lectures 1 to 5.
  
  These are all rather simple tasks. So, we expect you to deliver with high quality.
  The best thing you can do for quality assurance is to:
  a) validate all your HTML and CSS code;
  b) find a buddy so you can look through each other's code and give feedback.
  
  Please, do not forget this is an individual task and copying or letting others
  copy your code can be considered plagiarism. If you use fragments of code from
  the internet (Stack Overflow, W3C, etc.), make sure they are properly referenced in the code
  as a comment with the link to the resource you have used.
  
  Finally, also notice it is expected that you write your code from scratch. Therefore,
  downloading HTML templates or using CSS frameworks such as Tailwind CSS or
  Bootstrap is not allowed.
  
  Context
  You have just finished your first academic year at the university, and you are excited
  about the idea of getting a summer job to get some hands-on experience working as a
  web designer. Unfortunately, your work experience is scant, and you need to figure
  out a way of promoting yourself. Then, it comes to your mind the idea of building a
  website that talks about you.
  
  Notice that a personal website is not a resume. Resumes are boring. Personal Web
  sites give us the opportunity of differentiating ourselves from the rest. Some
  advantages of having a personal website are the following:
  • You can emphasise your strengths by driving the user's attention to remarkable
  things about you.
  • It makes you more findable.
  • It gives you the opportunity of building a personal brand.
  • It gives you a differentiating factor from the rest of the people.
  
  This compulsory activity is delivered individually. Feel free to create your real
  portfolio or create a fictional persona if you do not want to make the website about you.
  Avoid lorem ipsum text by all possible means. Semantic tags carry meaning, and
  the context of their content is important to understand whether they are used correctly
  or not.
  
  Task description
  Design and implement your personal portfolio page.
  Your personal website must contain 5 different pages:
  
  - **Home page**: Must include:
    - Image and description about you (use proper semantic tags)
    - Text introducing yourself
    - List of hobbies
    - A quotation from a book, song, or movie
  
  - **Resume/CV page**: Must include:
    - Academic background
    - Work experience
    - List of languages you speak
    - List of skills
  
  - **Portfolio page**: Showcase at least 3 different projects with:
    - Title
    - Short description (5-6 lines)
    - Image
  
  - **About page**: Explain your use of semantic tags, including a sketch of the layout.
  
  - **Contact page**: Must include at least 3 social networks and working links.
  
  Required
  Your assignment will be graded based on:
  • Use of structural and semantic tags.
  • Proper use of HTML elements.
  • Lists and nested lists.
  • Proper file naming and project hierarchy.
  • Readable and formatted code with comments.
  • Separation of CSS (no inline styles).
  • Use of colors, margins, and padding for readability.
  • Coherent styles across all pages.
  • English language usage.
  • No lorem ipsum text.
  • All pages must be linked with a <nav> top menu.
  • No templates, Bootstrap, or CSS frameworks allowed.
  
  Deliverables
  - **A zip file** named \`studentcode-o1-idg12922022.zip\`, containing the full project.
  - **A live version** of your site uploaded via FTP.
  
  Good luck!`;
  


const jsonSchema = {
    "name": "StudentAssessmentSchema",
    "schema": {
    "type": "object",
    "properties": {
        "grade": { "type": "integer", "description": "Grade awarded to the student" },
        "navigation": {
            "type": "object",
            "properties": {
                "navigation_menu": { "type": "integer", "description": "Score for navigation" },
                "proper_html_tags": { "type": "integer", "description": "Score for proper HTML tag usage" }
            },
            "required": ["navigation_menu", "proper_html_tags"]
        },
        "home_page": {
            "type": "object",
            "properties": {
                "content_requirements": { "type": "integer", "description": "Score for content completeness" },
                "proper_html_tags": { "type": "integer", "description": "Score for semantic HTML usage" }
            },
            "required": ["content_requirements", "proper_html_tags"]
        },
        "resume_page": {
            "type": "object",
            "properties": {
                "content_requirements": { "type": "integer", "description": "Score for completeness" },
                "proper_html_tags": { "type": "integer", "description": "Score for semantic HTML usage" }
            },
            "required": ["content_requirements", "proper_html_tags"]
        },
        "portfolio": {
            "type": "object",
            "properties": {
                "projects": { "type": "integer", "description": "Score for project descriptions" },
                "proper_html_tags": { "type": "integer", "description": "Score for proper HTML usage" }
            },
            "required": ["projects", "proper_html_tags"]
        },
        "contact_page": {
            "type": "object",
            "properties": {
                "content_requirements": { "type": "integer", "description": "Score for completeness of contact info" },
                "proper_html_tags": { "type": "integer", "description": "Score for correct HTML elements" }
            },
            "required": ["content_requirements", "proper_html_tags"]
        },
        "about": {
            "type": "object",
            "properties": {
                "reflection": { "type": "integer", "description": "Score for reflection on design choices" }
            },
            "required": ["reflection"]
        },
        "general_comments": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "General comments on project quality"
            }
        },
        "final_comments": { "type": "string", "description": "Final summary feedback" },
        "other_comments": { "type": "string", "description": "Other remarks from the evaluator" },
        "validation_errors": { "type": "string", "description": "Errors found in validation (HTML, CSS, etc.) If the HTML or CSS is not valid, the assignment is failed, regardless of overall score" },
        "positioning_problems": { "type": "string", "description": "Issues related to layout and responsiveness. If overflow is detected, the assignment is failed, regardless of overall score" }
    },
    "required": [
        "grade", "navigation", 
        "home_page", "resume_page", "portfolio", "contact_page", "about", 
        "general_comments", "final_comments", "other_comments", 
        "validation_errors", "positioning_problems"
    ],
    "additionalProperties": false
}
};


const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_schema", json_schema: jsonSchema }, 
    messages: [
        { role: "system", content: "You are an AI code evaluator. Provide feedback based on the given assessment criteria." },
        { 
            role: "user", 
            content: `Evaluate the following student submission according to the provided assessment criteria. 
            Fill out the JSON object and return a response strictly in the given format.

            Assessment Criteria: ${JSON.stringify(jsonSchema)}

            Assignment Description: ${assignmentDetails}

            Student Submission: ${submissionString}`
        }
    ]
});

// Output the structured JSON response
console.log(JSON.stringify(completion.choices[0].message.content, null, 2));
// const completion = await openai.chat.completions.create({
//     model: "gpt-4o",
//     messages: [
//         { role: "developer", content: `You are a code evaluator. ` },
//         {
//             role: "user",
//             content: `Use the following asssessment citeria and respond with these filled out: ${assessmentCriteria}. 
//         Here is the assignment description: ${assignmentDetails}. Here is the student submission you will be evaluating: ${submissionString}`,
//         },
//     ],
//     store: true,
// });

// console.log(completion.choices[0].message);