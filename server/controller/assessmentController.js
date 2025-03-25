import dotenv from "dotenv";
dotenv.config();
import { pool as SQLpool } from "../utils/SQLPool.js";
const pool = SQLpool;

const hjælp = {
    student: 3,
    assignment: 2,
    contents: {
        "reflections":{
           "own_mockup_feedback":"You provided a detailed reflection on your own mock-up. You explained that while you were generally satisfied with your design, you recognized areas that needed more specificity and clarity, such as container details and media query instructions.",
           "sustainability_feedback":"Your sustainability reflection explains choices like using web‐safe fonts over heavier custom fonts and compressing images to lower carbon footprint. However, including quantitative data or more specific statistics would have made your reflection even stronger.",
           "main_difficulties_feedback":"You provided a comprehensive discussion of the difficulties encountered, such as missing mock-up instructions, challenges with the navigation exit button, and adjustments needed for positioning. Your explanation was clear and reflective."
        },
        "requirements":{
           "z_index_feedback":"You correctly used z-index properties (e.g., in body, main, and dropdown content) to manage layering.",
           "nth_child_feedback":"You effectively applied the nth-child pseudo-class to insert custom emoticons in your list items.",
           "typefaces_feedback":"You used two distinct typefaces: a custom font (AvenirNext) and system fonts (Helvetica/Arial), satisfying the requirement.",
           "linear_gradient_feedback":"A linear gradient is applied to container backgrounds, which meets the assignment criteria.",
           "css_custom_emoticons_feedback":"Custom emoticons are implemented using CSS pseudo-elements on list items.",
           "different_font_sizes_feedback":"Different font sizes are utilized appropriately between headings and body text to enhance readability.",
           "fixed_background_image_feedback":"You set up a background image with a fixed attachment for the main element, fulfilling the requirement.",
           "mobile_and_desktop_versions_feedback":"Responsive design is achieved through media queries that adapt the layout for desktop and mobile screens.",
           "absolute_or_fixed_positioning_feedback":"Usage of absolute and fixed positioning (e.g., in the navigation and social sections) is coherent and meets the assignment requirements.",
           "pseudo_classes_and_pseudo_elements_feedback":"You have utilized pseudo-classes and pseudo-elements effectively, as seen in hover effects and nth-child selectors.",
        },
        "crucial_checks":{
           "validation_errors_feedback":"The submitted HTML and CSS code appears to be free of validation errors.",
           "positioning_problems_feedback":"No positioning problems like overflowing elements or horizontal scroll issues were detected in your layout.",
        },
        "general_comments":{
           "seo_feedback":"While you have included titles and basic metadata, more descriptive, unique page titles and meta descriptions could improve SEO.",
           "design_feedback":"Your design is coherent and consistent. Elements are well aligned, spacing is adequate, and the overall layout is user-friendly across devices.",
           "CSS_optimization_feedback":"Your CSS is neatly organized, with grouped rules and consistent naming conventions, facilitating maintenance.",
           "code_readablilty_feedback":"The code is structured and easy to follow, which demonstrates good coding practices.",
           "user_readability_feedback":"Content presentation is clear, and the use of semantic HTML elements enhances user readability.",
           "project_structure_feedback":"The project has a proper structure with separate pages, external CSS, and a clear folder organization as required.",
           "naming_conventions_feedback":"File and folder names follow proper naming conventions, making the project easy to navigate.",
           "semantic_structural_tags_feedback":"Semantic HTML tags such as header, nav, main, article, and footer have been used correctly.",
           "bringing_css_and_html_together_feedback":"CSS is implemented externally and integrated properly with the HTML, in line with the assignment guidelines.",
        },
        "AI_final_assessment":{
           "AI_final_comments":"Overall, your submission is solid and meets the bulk of the assignment requirements. Your implementation of responsive design, semantic HTML, and advanced CSS techniques such as pseudo-classes, gradients, and fixed backgrounds is commendable. The reflections are insightful, especially regarding the challenges posed by the mock-up and your sustainability considerations. Moving forward, enhancing your SEO elements and adding more quantitative details to your sustainability discussion could further improve your work. Keep up the good work!"
        }
    },
    result: "fail",
    student_work: [
        {
            path: "filpath/to/group.txt",
            type: "txt",
            contents: `
                Group 7:
                o   Christopher Ngo (chrisng@stud.ntnu.no)
                o   Ewelina Paulina Matyjaszczyk (ewelinam@stud.ntnu.no)
                o   Martin Hansen Løntjern (martihlo@stud.ntnu.no)
                o   Nora Lundquist (noralu@stud.ntnu.no)
                o   Veronika Zaguraeva (veroniza@stud.ntnu.no)

                https://folk.ntnu.no/noralu/pinkumbrella/`
        },
        {
            path: "filpath/to/home.html",
            type: "html",
            contents: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Home</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>

                <!-- Nav bar -->
                    <nav class="dropdown">
                        <div class="idg1292">
                            <p>IDG1292, Oblig2</p> 
                        </div>
                        <div class="hamburger"></div>
                        <div class="hamburger"></div>
                        <div class="hamburger"></div>
                        
                        <div class="dropdown-content">
                            <ul class="sidebarul">
                                <li class="sidebarli"><a href="index.html">Home</a></li>
                                <li class="sidebarli"><a href="reflection.html">About this newsletter</a></li>
                            </ul>
                            <div class="socials"> 
                                
                                <div>
                                <a href="https://www.instagram.com/">
                                    <img class="logo" src="images/instagramicon-kopi.png" alt="instagram icon">
                                </a>
                                </div>
                                <div>
                                <a href="https://www.facebook.com/">
                                    <img class="logo" src="images/facebookicon-kopi.png" alt="facebook icon">
                                </a>
                                </div>
                                <div>
                                <a href="https://pinterest.com/">
                                    <img class="logo" src="images/pinteresticon-kopi.png" alt="pinterest icon">
                                </a>
                                </div>  
                            </div>
                        </div>
                    </nav>

                <!-- Header -->
                    <header class="topbottomcontainer">
                        <h1>What is Sustainable Web Design?</h1>
                        <p>Web technology has the potential to bring huge benefits to society and the environment, but only if we use it wisely…</p>
                        
                    </header>
                    <main>

                <!-- Problem and facts box -->
                        <div class="parent">
                            <div class="left">
                        <section class="container">
                            <h2>Problem:</h2>
                            <p>The internet currently produces approximately 3.8% of global carbon emissions, 
                                which are rising in line with our hunger to consume more data. Increasingly, 
                                web technologies are also being used to sow discontent, erode privacy, prompt unethical decisions, 
                                and, in some countries, undermine personal freedoms and the well-being of society.</p>
                            <h2>Facts:</h2>
                            <ul>
                                <li>1.6 billion trees would have to be planted to offset the pollution caused by email spam.</li>
                                <li>1.5 billion trees would need to be planted to deal with annual e-commerce returns in the US alone.</li>
                                <li>231 million trees would need to be planted to deal with the pollution caused as a result of the 
                                    data US citizens consumed in a 2019. </li>
                                <li>16 million trees would need to be planted to offset the pollution caused by estimated 1.9 trillion 
                                    yearly searches on Google. </li>
                            </ul>
                        </section>
                        </div>

                <!-- Article 1 -->
                        <div class="right">
                        <article class="container">
                            <h2>Do you write reusable code?</h2>
                            <p>It perhaps goes without saying that it is inefficient to reinvent the wheel, 
                                yet it happens daily in web design projects around the world. The carbon footprint of a website 
                                includes the emissions of the team that created it, from their office energy to travel emissions. 
                                When we write code that can only be used once but which serves common purposes, 
                                we waste not just time but also energy.</p>
                            <p>Writing reusable code might not be a fit for every project, but it does help make our work more 
                                commercially efficient and delivers results with lower carbon emissions.</p>
                            <img src="images/mountain.jpeg" alt="mountain">
                        </article>
                    </div>

                <!-- Article 2 -->
                    <div class="left">
                        <article class="container">
                            <h2>Has the design used the minimum number of custom fonts?</h2>
                            <p>Custom font files can significantly increase the file size of web pages. 
                                A typical custom font file can be over 200kb and may only include a single weight. 
                                Multiple typefaces and multiple font weights can add up quickly, 
                                increasing energy use and causing slow performance. 
                                Use custom fonts frugally and try to use system fonts that are already on the users device.</p>
                            <img src="images/bird.jpeg" alt="bird">
                        </article>
                        </div>

                <!-- Article 3 -->
                        <div class="right">
                        <article class="container">
                            <h2>Could a Progressive Web App be an efficient solution?</h2>
                            <p>Progressive Web App technology can be used to improve user experiences and save data by 
                                caching key information and assets on the user’s device. 
                                Even bigger efficiencies can perhaps be gained by using Progressive Web Apps instead of native mobile apps, 
                                which are often far more bloated.</p>
                            <img src="images/bridge.jpeg" alt="bridge">
                        </article>
                        </div>
                    </div>
                    </main> 

                <!-- Footer -->
                    <footer class="topbottomcontainer">
                        <ul>
                            <li>Click here to read <a href="reflection.html">about this newsletter</a></li>
                            <li>Text from: <a href="https://sustainablewebdesign.org/">Sustainable Web Design</a></li> 
                            <li>Fonts from: <a href="https://freefontsfamily.com/avenir-next-font-download-free/">FreeFontsFamily</a></li>
                            <li>Background image from: <a href="https://www.publicdomainpictures.net/">PublicDomainPictures</a></li>
                            <li>Social media icons from: <a href="https://www.flaticon.com/">FlatIcon</a></li>
                            <li>Article pictures from: <a href="https://unsplash.com/">Unsplash</a></li>
                        </ul>
                    </footer>

                </body>
                </html>`
        },
        {
            path: "filpath/to/reflection.html",
            type: "html",
            contents: `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reflection page</title>
                    <link rel="stylesheet" href="style.css">
                    </head>
                    <body>
                        
                    <!-- Nav bar -->
                    <nav class="dropdown">
                        <div class="idg1292">
                        <p>IDG1292, Oblig2</p>
                        </div>
                        <div class="hamburger"></div>
                        <div class="hamburger"></div>
                        <div class="hamburger"></div>

                        <div class="dropdown-content">
                        <ul class="sidebarul">
                            <li class="sidebarli"><a href="index.html">Home</a></li>
                            <li class="sidebarli"><a href="reflection.html">About this newsletter</a></li>
                        </ul>

                        <div class="socials">
                            <div>
                            <a href="https://www.instagram.com/">
                                <img class="logo" src="images/instagramicon-kopi.png" alt="instagram icon"></a>
                            </div>
                            <div>
                            <a href="https://www.facebook.com/">
                                <img class="logo" src="images/facebookicon-kopi.png" alt="facebook icon"></a>
                            </div>
                            <div>
                            <a href="https://pinterest.com/">
                                <img class="logo" src="images/pinteresticon-kopi.png" alt="pinterest icon"></a>
                            </div>
                        </div>
                        </div>
                    </nav>

                    <header class="topbottomcontainer">
                        <h1>Reflection</h1>
                    </header>

                    <!-- Box 1 -->
                    <main id="reflection">
                    <div class="parent">
                        <div class="left">
                            <section class="container">
                            <h2>Section 1</h2>
                            <p>
                            It was easy to follow the mock-up, the drawings was clear and
                            simple. However, there was some missing information. There was
                            nothing about a preferred background image, only one mentioned
                            font face (when we needed at least two) and no information the
                            other article images. Moreover, the mock-up lacked information
                            about which gradients they wanted, however, they did specify
                            colors.
                            </p>
                            <p>
                            We followed the instructions of the other group\'s layout, however,
                            the lack of instructions made it difficult. One of difficulties we
                            had was that the instructions were awkwardly structured. Also one
                            of the downsides was that the group we got the layout from didn\'t
                            say anything about the choice of background picture and pictures
                            in general so we had to make that choice ourselves. The next need
                            was to make changes to the navigation child, since the layout
                            suggested that we should make an "exit button", but we did not
                            manage to do it.
                            </p>
                            <p>
                            Many elements were not specific such as: margin, padding, font
                            sizes etc. Only a few details were included. In the mock-up they 
                            wanted the dropdown menu to cover the page, this would require the 
                            z-index. We used the z-index in order to make sure that the dropdown
                            menu displayed on top of the rest of the page. In the navbar they
                            wanted an exit button, we did not do this because we didn\'t know
                            how to do it without Javascript. To implement relative and
                            absolute positioning on the site, we set position to relative on
                            the sidebar menu and position absolute on the socials section at
                            the bottom of the sidebar.
                            </p>
                            <p>
                            The mock-up specified that they would like to have images between articles,
                            but it didn\'t make sense as it would break up the text awkwardly
                            so we put them at the end of each article.
                            </p>
                            <p>
                            We enjoyed the overall design idea of the webpage and found it to be
                            very pleasing, visually. And although both the dropdown and sidebar menu was 
                            challenging, the end result feels very natural and intuitive. We also found
                            the mock-up design to be very realistic (in large parts) in terms of implementation.
                            </p>
                            </section>
                        </div>

                        <!-- Box 2 -->
                        <div class="right">
                            <section class="container">
                            <h2>Section 2</h2>
                            <p>
                            We tried to make it environmentally friendly as much as we could.
                            In the mock-up description that we received they chose just one
                            font-face which is Avenir Next. Avenir Next has bigger carbon
                            footprint than web-safe fonts-faces, because it needs to be
                            downloaded. Since they didn\'t specify a second font, we chose
                            Helvetica with Arial as fallback because it was eco friendly and
                            web-safe. We would have gone for a more web-safe font that was
                            more carbon friendly as browsers usually come with the font.
                            </p>
                            <p>
                            For the images, we downloaded free ones from "Unsplash". Since the
                            mock-up didn\'t specify what type of pictures they wanted, we chose
                            nature themed ones. Then we compressed the pictures to make them
                            smaller and added a black and white filter to make it more eco
                            friendly.
                            </p>
                            <p>
                            Picture below is a table of the estimated total size of the
                            website before and after compressed the images and made them more
                            eco friendly.
                            </p>
                            <img class="stats" src="images/data.jpeg" alt="data">
                            </section>
                        </div>

                        <!-- Box 3 -->
                        <section id="section3">
                            <h2>Section 3</h2>
                            <p>
                            In regards to our own mock-up, we are sort of satisfied with it. In
                            hindsight there are plenty of things we could have been more
                            specific about. We gave the other group the freedom to chose their
                            images on their own, however, we should at least have specified the
                            themes of the images. Moreover, we could have been more specific
                            with our containers and the specific structure of the page in terms
                            of tags. Another part of our mock up that could be improved is the
                            way we have written some of the page specifications in the page
                            headings in the PDF. The mixing of description and title-heading
                            could be confusing, especially when we have included specific
                            instructions below as well. We could have been more specific in our
                            media queries section, but we felt that the information that was
                            there should be sufficient to design the page.
                            </p>
                            <p>
                            We are satisfied with a large amount of of the information we have
                            given regarding the sizing of margins and height of each section of
                            the page. Our page mock-up did also include most, if not all, of the
                            requirements that was in the mock-up brief. Additionally, we feel we
                            have been specific, albeit a little messy, in the order of our
                            description. The drawings of our website should be plenty
                            descriptive for the final look of site.
                            </p>
                            <p>
                            The parts of the mock-up we foresee the other group would struggle
                            the most with, might be centering the headings over the article
                            images and giving the headings a iced, blurred background. We forgot
                            to have a gradient in the mock-up, though we did supply information
                            about which base color each section should have. The lack of
                            specificity in the media query might also prove to be a problem.
                            Other than that, the mock-up should be relatively easy to implement.
                            </p>
                            <p>
                            If we were to do it again, we would have been much more orderly with
                            the mock-up instructions, especially regarding the media query and
                            image themes. Furthermore, we would have spent more time on the
                            semantical tags just so that there could be no confusion. Lastly,
                            perhaps we could have simplified the z-index that you have to do
                            with the images and the headings.
                            </p>
                        </section>
                    </div>
                    </main>

                    <!-- footer -->
                    <footer class="topbottomcontainer">
                        <ul>
                        <li>Click here to go back to: <a href="index.html">Homepage</a></li>
                        <li>Text from: <a href="https://sustainablewebdesign.org/">Sustainable Web Design</a></li>
                        <li>Fonts from:<a href="https://freefontsfamily.com/avenir-next-font-download-free/">FreeFontsFamily</a></li>
                        <li>Background image from:<a href="https://www.publicdomainpictures.net/">PublicDomainPictures</a></li>
                        <li>Social media icons from:<a href="https://www.flaticon.com/">FlatIcon</a></li>
                        <li>Article pictures from: <a href="https://unsplash.com/">Unsplash</a></li>
                        </ul>
                    </footer>
                    </body>
                </html>`
        },
        {
            path: "filpath/to/style.css",
            type: "css",
            contents: `
                @font-face {
                    font-family: avenirnextregular;
                    src: url(fonts/AvenirNextLTPro-Regular.otf);
                }

                *{
                    margin: 0;
                    box-sizing: border-box;
                    word-wrap: break-word;
                }

                body {
                    position: relative;
                    z-index: -9999;
                }

                main{
                    background-image: url(images/leaves.jpeg);
                    background-size: 60%;
                    background-attachment: fixed;
                    background-repeat: repeat;
                    position: relative;
                    z-index: -3;
                }

                /* nav bar */
                .idg1292{
                    display: none;
                }

                nav{
                    position: fixed;
                }

                p,li {
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 12pt;
                    max-width: 100%;
                    margin-bottom: 10px;
                }

                .hamburger{
                    width: 35px;
                    height: 5px;
                    background-color: black;
                    margin: 6px 0;
                    border: solid white 0.1px;
                    box-shadow: 0px 0px 10px 0px rgb(39, 93, 18);
                }

                .dropdown-content{
                    display: none;
                    position: absolute;
                    background-color: #5f7a44;
                    min-width: 100vw;
                    min-height: 80vh;
                    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                    padding: 12px 16px;
                    z-index: 1;
                }

                .dropdown:hover .dropdown-content {
                    display: inline-block;
                }

                .sidebarul{
                    list-style: none;
                    padding: 0;
                }

                .sidebarli{
                    margin-bottom: 20px;
                    text-align: center;
                    padding: 5% 0;
                    text-transform: uppercase;
                }

                .sidebarli:hover{
                    background-color:  #8bac6a;
                    box-shadow: 0px 0px 10px 0px darkslategray;
                }

                .sidebarli > a{
                    text-decoration: none;
                    color: #efebdd;
                }

                .socials {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    margin-bottom: 20px;
                    border-top: solid white;
                    width: 100%;
                }

                .socials > div {
                    display: inline-block;
                    bottom: 0;
                    margin: 20px 0% 0 20%;
                }

                /* Header */
                .topbottomcontainer{
                    border: solid black;
                    background-color: rgb(23, 64, 41);
                    padding: 2%;
                    color: #F2F2F2;
                    margin: 0 auto;
                    text-align: center;
                }

                /* Problem and facts box */
                .parent{
                    max-width: 60%;
                    margin: 0 auto;
                }

                .container{
                    border: solid black;
                    max-width: 100%;
                    margin: 25px 0;
                    background-color: floralwhite;
                    padding: 5%;
                    background: linear-gradient(#8dc0a3, #2e6f4a);
                    color: #efebdd;
                    position: relative;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                li {
                    padding-left: 1rem;
                    text-indent: -0.7rem;
                }

                li:nth-child(1)::before {
                    content: "\\1F331";
                }

                li:nth-child(2)::before {
                    content: "\\1F343";
                }

                li:nth-child(3)::before {
                    content: "\\1F33F️";
                }

                li:nth-child(4)::before {
                    content: "\\1F333";
                }

                li:nth-child(5)::before {
                    content: "\\267B";
                }

                li:nth-child(6)::before {
                    content: "\\1F332";
                }

                #reflection {
                    background-image: none;
                }

                img{
                    margin-top: 10px;
                    max-height: 50%;
                    filter: grayscale(100%);
                    max-width: 50%;
                }

                .stats{
                    max-width: 100%;
                    max-height: 100%;
                }

                h1{
                    margin-left: 30px;
                }

                h1,h2 {
                    font-family: avenirnextregular, \'Times New Roman\', Times, serif;
                    font-weight: 900;
                    font-size: 24pt;
                    max-width: 100%;
                }

                h2{
                    margin: 10px 0;
                }

                p,li {
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 12pt;
                    max-width: 100%;
                    margin-bottom: 10px;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                li {
                    padding-left: 1rem;
                    text-indent: -0.7rem;
                }

                /* Footer */
                .topbottomcontainer a {
                    text-decoration: none;
                    color: gray;
                }

                .topbottomcontainer a:hover{
                    background-color: lightgrey;
                }

                #section3{
                    border: solid black;
                    max-width: 100%;
                    height: 100%;
                    margin: 25px 0;
                    background-color: floralwhite;
                    padding: 5%;
                    background: linear-gradient(#8dc0a3, #2e6f4a);
                    color: #efebdd;
                }

                .logo {
                    max-width: 100%;
                    width: 20px;
                    height: 20px;
                    margin-left: 5px;
                    margin-bottom: 2px;
                    filter: invert(100%);
                }

                .logo:hover {
                    border-radius: 15%;
                    box-shadow: 0px 0px 10px 0px black;
                }


                /* ------------------------- MEDIA QUERIES -------------------------  */
                @media only screen and (min-width: 960px){

                    body{
                        margin: 0;
                        box-sizing: border-box;
                        background-color: whitesmoke;
                    }

                    main{
                        background-image: url(images/leaves.jpeg);
                        background-size: 60%;
                        background-attachment: fixed;
                        background-repeat: repeat;
                        
                    }


                    main, header, footer{
                        right: 0;
                        min-width: 70%;
                        margin: 0 auto;
                        margin-left: 220px;
                        margin-right: 25px;
                    }

                    h1, h1 + p, .topbottomcontainer p{
                        text-align: center;
                    }

                    .topbottomcontainer{
                        border: solid black;
                        max-width: 100%;
                        margin-left: 220px;
                        margin-bottom: 20px;
                        margin-top: 20px;
                        margin-right: 20px;
                    }

                    /* nav bar */
                    .idg1292{
                        display: block;
                        background-color: white;
                        color: black;
                        padding: 15%;
                        text-align: center;
                        top: 0;
                        text-transform: uppercase;
                    }

                    nav{
                        width: 200px;
                        position: fixed;
                        left: 0;
                        top: 0;
                    }
                    .hamburger{
                        display: none;
                    }

                    .dropdown-content{
                        position: relative;
                        display: inline-block;
                        height: 91.55vh;
                        min-width: 200px;
                        padding: 0;
                        background-color: #5f7a44;
                    }

                    .sidebarul{
                        display: block;
                        list-style: none;
                        padding: 0;
                        margin-top: 10px;
                    }  

                    .sidebarli{
                        margin-bottom: 20px;
                        text-align: center;
                        padding: 5% 0;
                        text-transform: uppercase;
                    }

                    .sidebarli > a{
                        text-decoration: none;
                        color: white;  
                    }
                    .sidebarli:hover{
                        background-color:  #8bac6a;
                        box-shadow: 0px 0px 10px 0px darkslategray;
                    }
                    .socials {
                        position: absolute;
                        bottom: 0;
                        margin-bottom: 20px;
                        border-top: solid white;
                        width: 100%;
                    }

                    .socials > div {
                        display: inline-block;
                        bottom: 0;
                        margin-top: 20px;
                        margin-left: 13%;
                    }

                    .container{
                        border: solid black;
                        max-width: 100%;
                        min-height: 500px;
                        margin: 25px 0 0 50px;
                        background-color: floralwhite;
                        padding: 5%;
                        
                    }

                    img {
                        box-sizing: content-box;
                    }

                    div.left, div.right{
                        height: 100%;
                        width: 49%;
                        margin: 2.5% 0;
                    }

                    .parent{
                        max-width: 90%;
                        margin: 0 auto;
                    }

                    .parent > div{
                        vertical-align: middle;
                        display: inline-block;
                        max-width: 60%;
                    }

                    .logo {
                        width: 20px;
                        height: 20px;
                        margin-left: 5px;
                        margin-bottom: 1.5em;
                    }

                    .logo:hover {
                        border-radius: 15%;
                        box-shadow: 0px 0px 10px 0px black;
                    }

                }`
        }
    ]
}

// get all
// for lecturers
export async function getAssignmentAssessments(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE assignment_id = ?
            GROUP BY fa.assessment_id;
            `, [req.params.assignment_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No assessments found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}
// for students
export async function getMyAssessments(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE student_id = ?
            GROUP BY fa.assessment_id;
            `, [req.query.id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("No assessments found"), { status: 404 });
        }

        const geef = {};

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// get one
export async function getOneAssessment(req, res, next) {
    try {
        const [rows] = await pool.query(`
            SELECT
                fa.assessment_id,
                CONCAT(u.first_name, ' ', u.last_name) AS student_name,
                fa.assignment_id,
                fa.assessment_contents,
                fa.assessment_result,
                fa.is_reviewed,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'file_contents', sw.file_contents,
                        'filetype', sw.filetype,
                        'filepath', sw.filepath
                    )
                ) AS student_work
            FROM final_assessments fa
            JOIN users u ON fa.student_id = u.user_id
            LEFT JOIN student_work sw ON fa.assessment_id = sw.assessment_id
            WHERE fa.assessment_id = ?
            GROUP BY fa.assessment_id;
            `, [req.params.assessment_id]
        );

        if (rows.length == 0) {
            throw Object.assign(new Error("Assessment not found"), { status: 404 });
        }

        return res.status(200).json(rows);
    } catch (error) {
        next(error);
    }
}

// post / patch - auth(S)?
export async function createAssessment(req, res, next) {
    try {
        const [old] = await pool.query(`
            SELECT assessment_id
            FROM final_assessments
            WHERE student_id = ? AND assignment_id = ?;
            `, [hjælp.student, hjælp.assignment]
        );

        if (old.length == 0) {
            // create
            const [result] = await pool.query(`
                INSERT INTO final_assessments (student_id, assignment_id, assessment_contents, assessment_result)
                VALUES (?, ?, ?, ?);
                `, [hjælp.student, hjælp.assignment, JSON.stringify(hjælp.contents), hjælp.result]
            );

            const assessmentID = result.insertId;

            for (let i = 0; i < hjælp.student_work.length; i++) {
                const [work] = await pool.query(`
                    INSERT INTO student_work (assessment_id, file_contents, filetype, filepath)
                    VALUES (?, ?, ?, ?);
                    `, [assessmentID, hjælp.student_work[i].contents, hjælp.student_work[i].type, hjælp.student_work[i].path]
                );
            }
        } else {
            // update
            // remove old student work
            const [outdated] = await pool.query(`
                DELETE FROM student_work
                WHERE assessment_id = ?;
                `, [old[0].assessment_id]
            )

            // update assessment
            const [result] = await pool.query(`
                UPDATE final_assessments
                SET
                    student_id = ?,
                    assignment_id = ?,
                    assessment_contents = ?,
                    assessment_result = ?
                WHERE assessment_id = ?;
                `, [hjælp.student, hjælp.assignment, JSON.stringify(hjælp.contents), hjælp.result, old[0].assessment_id]
            );

            for (let i = 0; i < hjælp.student_work.length; i++) {
                const [work] = await pool.query(`
                    INSERT INTO student_work (assessment_id, file_contents, filetype, filepath)
                    VALUES (?, ?, ?, ?);
                    `, [old[0].assessment_id, hjælp.student_work[i].contents, hjælp.student_work[i].type, hjælp.student_work[i].path]
                );
            }
        }

        return res.status(200).json("Successfully stored information");
    } catch (error) {
        next(error);
    }
}

// patch - auth(L)
export async function evaluateAssessment(req, res, next) {
    try {
        // code
    } catch (error) {
        next(error);
    }
}
