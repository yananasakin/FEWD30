<script> src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>


<script>
var quiztitle = "Food Quiz";


var quiz = [
       {
           "image" :  'http://www.epicurious.com/recipes/food/views/ceviche-de-camaron-shrimp-ceviche-cocktail-104995',
           "choices" : [
                                   "Ceviche",
                                   "Paella",
                                   "Sashimi",
                                   "Bibimbap",
                               ],
           "correct" : "Ceviche",
           "origin" : "South American Spanish",
       },
       {
           "image" : "http://smittenkitchen.com/blog/2010/04/shakshuka/",
           "choices" : [
                                   "Fallafel",
                                   "Taboulli",
                                   "Shakshouka",
                                   "Tajine",
                               ],
           "correct" : "Shakshouka",
           "origin" : "North Africa",
       },
       {

           "image" : "http://www.mypersiankitchen.com/khoresht-fesenjan-persian-pomegranate-and-walnut-stew",
           "choices" : [
                                   "Shashlik Kebap",
                                   "Fesenjan",
                                   "Mandu",
                                   "Roti",
                               ],
           "correct" : "Fesenjan",
           "origin" : "Iran",
       },

       {
          "image" : "http://cooking.nytimes.com/recipes/1014999-beef-carpaccio",
          "choices" : [
                                    "Beef Bourguignon",
                                    "Gnocchi",
                                    "Bruschetta",
                                    "Carpaccio",
                                ],
          "correct" : "Carpaccio",
          "origin" : "Italy",

       },

       {
          "image" : "http://www.budapestbylocals.com/hungarian-goulash.html",
          "choices" : [
                                    "Goulash",
                                    "Börek",
                                    "Shnitzel",,
                                    "Khachapuri",
                                ],
          "correct" : "Goulash",
          "origin" : "Hungary, Central Europe",
       },

       {
          "image" : "http://mykoreankitchen.com/2013/07/12/bibimbap-korean-mixed-rice-with-meat-and-assorted-vegetables/",
          "choices" : [
                                    "Bibimbap",
                                    "Kim Bap",
                                    "Kimchi",
                                    "Kalbi Beef",
                                ],
          "correct" : "Bibimbap",
          "origin" : "Korea",
       },

       {
          "image" :
          "http://natashaskitchen.com/2011/05/09/russian-pelmeni-recipe-new-dough-recipe/",
          "choices" : [
                                    "Piroshki",
                                    "Baozi",
                                    "Pelmeni",
                                    "Goluptzi",
          ]
          "correct" : "Pelmeni",
          "origin" : "Russia",
       },

       {
          "image" :
          "http://www.epicurious.com/recipes/food/views/chilaquiles-verdes-354951",
          "choices" : [
                                    "Chilaquiles",
                                    "Aguachiles",
                                    "Enchiladas",
                                    "Chalupas",
          ],
          "correct" : "Chilaquiles",
          "origin" : "Mexico",
       },

       {
          "image" : "http://norecipes.com/recipe/okonomiyaki-recipe",
          "choices" : [
                                    "Inari",
                                    "Gyoza",
                                    "Tekkadon",
                                    "Okonomiyaki",
          ],
          "correct" : "Okonomiyaki",
          "origin" : "Japan",
        },

        {
          "image" : "http://www.globalgourmet.com/food/cookbook/2010/french-table/hachis-parmentier.html#axzz3b6ajXIf4",
          "choices" : [
                                    "Hachis Parmentier",
                                    "Quiche Lorraine",
                                    "Raclette",
                                    "Bouillabaisse",
          ],
          "correct" : "Hachis Parmentier",
          "origin" : "France",
        },

   ];


var currentquestion = 0,
    score = 0,
    submt = true,
    picked;

jQuery(document).ready(function ($) {


    function htmlEncode(value) {
        return $(document.createElement('div')).text(value).html();
    }


    function addChoices(choices) {
        if (typeof choices !== "undefined" && $.type(choices) == "array") {
            $('#choice-block').empty();
            for (var i = 0; i < choices.length; i++) {
                $(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
            }
        }
    }

    function nextQuestion() {
        submt = true;
        $('#origin').empty();
        $('#question').text(quiz[currentquestion]['question']);
        $('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
        if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
            if ($('#question-image').length == 0) {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
            } else {
                $('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
            }
        } else {
            $('#question-image').remove();
        }
        addChoices(quiz[currentquestion]['choices']);
        setupButtons();


    }


    function processQuestion(choice) {
        if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
            $('.choice').eq(choice).css({
                'background-color': '#50D943'
            });
            $('#origin').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['origin']));
            score++;
        } else {
            $('.choice').eq(choice).css({
                'background-color': '#D92623'
            });
            $('#origin').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['origin']));
        }
        currentquestion++;
        $('#submitbutton').html('NEXT QUESTION &raquo;').on('click', function () {
            if (currentquestion == quiz.length) {
                endQuiz();
            } else {
                $(this).text('Check Answer').css({
                    'color': '#222'
                }).off('click');
                nextQuestion();
            }
        })
    }


    function setupButtons() {
        $('.choice').on('mouseover', function () {
            $(this).css({
                'background-color': '#e1e1e1'
            });
        });
        $('.choice').on('mouseout', function () {
            $(this).css({
                'background-color': '#fff'
            });
        })
        $('.choice').on('click', function () {
            picked = $(this).attr('data-index');
            $('.choice').removeAttr('style').off('mouseout mouseover');
            $(this).css({
                'border-color': '#222',
                'font-weight': 700,
                'background-color': '#c1c1c1'
            });
            if (submt) {
                submt = false;
                $('#submitbutton').css({
                    'color': '#000'
                }).on('click', function () {
                    $('.choice').off('click');
                    $(this).off('click');
                    processQuestion(picked);
                });
            }
        })
    }


    function endQuiz() {
        $('#origin').empty();
        $('#question').empty();
        $('#choice-block').empty();
        $('#submitbutton').remove();
        $('#question').text("You got " + score + " out of " + quiz.length + " correct.");
        $(document.createElement('h2')).css({
            'text-align': 'center',
            'font-size': '4em'
        }).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');
    }


    function init() {
        //add title
        if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
            $(document.createElement('h1')).text(quiztitle).appendTo('#frame');
        } else {
            $(document.createElement('h1')).text("Quiz").appendTo('#frame');
        }

        //add pager and questions
        if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
            //add pager
            $(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
            //add first question
            $(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
            //add image if present
            if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
                $(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
            }
            $(document.createElement('p')).addClass('origin').attr('id', 'origin').html('&nbsp;').appendTo('#frame');

            //questions holder
            $(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

            //add choices
            addChoices(quiz[0]['choices']);

            //add submit button
            $(document.createElement('div')).addClass('choice-box').attr('id', 'submitbutton').text('Check Answer').css({
                'font-weight': 700,
                'color': '#222',
                'padding': '30px 0'
            }).appendTo('#frame');

            setupButtons();
        }
    }

    init();
});
