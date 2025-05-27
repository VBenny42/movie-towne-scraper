jQuery(document).ready(function ($) {

  var newTitle = "";
  var newURL = "";
  var newSummary = "";
  var newImage = "";

  $('#message-dialog').dialog({
    autoOpen: false
  });

  /*
   cursorcolor - change cursor color in hex, default is "#000000"
   cursoropacitymin - change opacity very cursor is inactive (scrollabar "hidden" state), range from 1 to 0, default is 0 (hidden)
   cursoropacitymax - change opacity very cursor is active (scrollabar "visible" state), range from 1 to 0, default is 1 (full opacity)
   cursorwidth - cursor width in pixel, default is 5 (you can write "5px" too)
   cursorborder - css definition for cursor border, default is "1px solid #fff"
   cursorborderradius - border radius in pixel for cursor, default is "4px"
   zindex - change z-index for scrollbar div, default value is 9999
   scrollspeed - scrolling speed, default value is 60
   mousescrollstep - scrolling speed with mouse wheel, default value is 40 (pixel)
   touchbehavior - enable cursor-drag scrolling like touch devices in desktop computer (default:false)
   hwacceleration - use hardware accelerated scroll when supported (default:true)
   boxzoom - enable zoom for box content (default:false)
   dblclickzoom - (only when boxzoom=true) zoom activated when double click on box (default:true)
   gesturezoom - (only when boxzoom=true and with touch devices) zoom activated when pitch out/in on box (default:true)
   grabcursorenabled, display "grab" icon for div with touchbehavior = true, (default:true)
   autohidemode, how hide the scrollbar works, true=default / "cursor" = only cursor hidden / false = do not hide
   background, change css for rail background, default is ""
   iframeautoresize, autoresize iframe on load event (default:true)
   cursorminheight, set the minimum cursor height in pixel (default:20)
   preservenativescrolling, you can scroll native scrollable areas with mouse, bubbling mouse wheel event (default:true)
   railoffset, you can add offset top/left for rail position (default:false)
   bouncescroll, enable scroll bouncing at the end of content as mobile-like (only hw accell) (default:false)
   spacebarenabled, enable page down scrolling when space bar has pressed (default:true)
   railpadding, set padding for rail bar (default:{top:0,right:0,left:0,bottom:0})
   disableoutline, for chrome browser, disable outline (orange hightlight) when selecting a div with nicescroll (default:true)
   horizrailenabled, nicescroll can manage horizontal scroll (default:true)
   railalign, alignment of vertical rail (defaul:"right")
   railvalign, alignment of horizontal rail (defaul:"bottom")
   enabletranslate3d, nicescroll can use css translate to scroll content (default:true)
   enablemousewheel, nicescroll can manage mouse wheel events (default:true)
   enablekeyboard, nicescroll can manage keyboard events (default:true)
   smoothscroll, scroll with ease movement (default:true)
   sensitiverail, click on rail make a scroll (default:true)
   enablemouselockapi, can use mouse caption lock API (same issue on object dragging) (default:true)
   cursorfixedheight, set fixed height for cursor in pixel (default:false)
   hidecursordelay, set the delay in microseconds to fading out scrollbars (default:400)
   directionlockdeadzone, dead zone in pixels for direction lock activation (default:6)
   nativeparentscrolling , detect bottom of content and let parent to scroll, as native scroll does (default:true)
   enablescrollonselection, enable auto-scrolling of content when selection text (default:true)
   */


  var $niceScrollBlackOpts = {
    'cursorwidth': '4px',
    'cursoropacitymin': .2,
    'cursoropacitymax': .8,
    'cursorcolor': '#fff',
    'cursorborder': 'none',
    'cursorborderradius': 0,
    'bouncescroll': false,
    'background': '#5e5e5e',
    'railpadding': {top: 0, right: 3, left: 0, bottom: 0},
    'zindex': 999,
    'autohidemode': true
  };

  var $niceScrollBlueOpts = {
    'cursorwidth': '4px',
    'cursoropacitymin': .2,
    'cursoropacitymax': .8,
    'cursorcolor': '#0668ac',
    'cursorborder': 'none',
    'cursorborderradius': 0,
    'bouncescroll': false,
    'background': '#043b63',
    'railpadding': {top: 0, right: 3, left: 0, bottom: 0},
    'zindex': 999,
    'autohidemode': true
  };

  var $niceScrollBanquetOpts = {
    'cursorwidth': '4px',
    'cursoropacitymin': .2,
    'cursoropacitymax': .8,
    'cursorcolor': '#deac4b',
    'cursorborder': 'none',
    'cursorborderradius': 0,
    'bouncescroll': false,
    'background': '#633e04',
    'railpadding': {top: 0, right: 3, left: 0, bottom: 0},
    'zindex': 999,
    'autohidemode': true
  };


  var isCanvasSupported = function () {
    var elem = $('<canvas>');
    return (elem[0].getContext && elem[0].getContext('2d'));
  };


  // Center images
  var centerImage = function (image, baseH) {
    image = $(image);

    var ih = image[0].height,
      ph = image.parent().height(),
      diff;

    // Try parent positioning first
    if (ih > ph) {
      diff = ph - ih;
      image.css({'margin-top': (diff / 2) + 'px'});
    } else if (ih < baseH) {
      diff = baseH - ih;
      image.css({'margin-top': (diff / 2) + 'px', 'margin-bottom': (diff / 2) + 'px'});
    }
  };

  var preloadImages = function (arrayOfImages) {
    $(arrayOfImages).each(function () {
      $('<img/>')[0].src = this;
      // Alternatively you could use:
      // (new Image()).src = this;
    });
  }

  // Preload some hover states
  preloadImages([
      SITE_URL + 'assets/images/home_ico_hover.png',
      SITE_URL + 'assets/images/view_list_selected.png',
      SITE_URL + 'assets/images/view_callendar_selected.png',
      SITE_URL + 'assets/images/view_list_promotions_selected.png',
      SITE_URL + 'assets/images/view_callendar_promotions_selected.png',
      SITE_URL + 'assets/images/vote_radio_selected.png',
      SITE_URL + 'assets/images/vote_close.png',
      SITE_URL + 'assets/images/vote_thumbs_up_hover.png'
  ]);

  // Center movie poster image
  if ($('.movie_poster_img').length) {
    //centerImage('.movie_poster_img', 620);
  }

  // Attach a window resize listener to center images
  $(window).resize(function () {
    if ($('.movie_poster_img').length) {
      //centerImage('.movie_poster_img', 620);
    }
  });

  // specials empty links
  if ($('.specials_inner a').length || $('.content_body_blue_grad_scroller .special a').length) {
    $('.specials_inner a, .content_body_blue_grad_scroller .special a').each(function (index, element) {
      if ($(element).attr('href') == '#') $(element).unbind('click').bind('click', function () {
        return false;
      });
    });
  }

  /*if($('.content_body_blue_grad_scroller .event2 a').length){
   $('.content_body_blue_grad_scroller .event2 a').each(function(index, element) {
   if($(element).attr('href') == '#') $(element).unbind('click').bind('click', function(){ return false; });
   });
   }*/


  //---------------------------------------------------------------
  //---------------------------------------------------------------
  // Blog detail ajax popup
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  if ($('.popup_link').length || $('.thumbnail_wrapper a').length) {

    var blogXHR = false;
    $('.popup_link, .thumbnail_wrapper a').not('.event_list .thumbnail_wrapper a').unbind('click').bind('click', function () {
      if (!$(this).data('blogTitle')) return false;

      var self = $(this);

      // Loader
      var loaderWrapper = '<div id="loader_wrapper">' +
        '<div class="overlay"><!-- --></div>' +
        '<div class="loading">' +
        '<p>Loading your request. Please wait.</p>' +
        '</div>' +
        '</div>';

      var blogFunctions = {

        destroy: function () {
          // unbind click handlers
          $('.movie_vote_close, #movie_vote_wrapper .overlay').unbind('click');

          $('#movie_vote_wrapper').fadeOut(600, 'easeInOutExpo', function () {
            $(this).remove();
          });
        },

        showLoader: function () {
          if (!$('#loader_wrapper').length) {
            $('#container').append($(loaderWrapper).hide());
            $('#loader_wrapper').width($('#container').width());
            $('#loader_wrapper').height($('#container').height());
            $('#loader_wrapper .loading').css('top', self.offset().top);
            $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');
          }
        },

        // Kill the XHR
        killXHR: function () {
          if (blogXHR) {
            blogXHR.abort();
            delete blogXHR;
            blogXHR = false;
          }
        },

        // get detail function
        getDetailFunction: function (url, title) {
          if (!url || typeof url == 'undefined' || !title || typeof title == 'undefined') return false;

          blogFunctions.showLoader();
          blogFunctions.killXHR();
          blogXHR = $.ajax({
            url: url,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();

                if (result == 'Error') {
                  alert('An un-identified error occured! We\'ll have this sorted out soon');
                } else {

                  var contentBox = '<div id="movie_vote_wrapper">' +
                    '<div class="overlay"><!-- --></div>' +
                    '<div class="movie_vote_box movie_vote_box_expanded">' +
                    '<a href="#" class="movie_vote_close"><!-- --></a>' +
                    '<p class="vote_header">' + title + '</p>' +
                    '</div>' +
                    '</div>';

                  $('#container').append($(contentBox).hide());
                  $('#movie_vote_wrapper').width($('#container').width());
                  $('#movie_vote_wrapper').height($('#container').height());
                  $('#movie_vote_wrapper .movie_vote_box').css('top', $(window).height() / 2);
                  $('#movie_vote_wrapper').fadeIn(600, 'easeInOutExpo');

                  $('.movie_vote_box').append($(result).hide());
                  $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                    // do nice scroll
                    $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                  });

                  // Destroy
                  $('.movie_vote_close, #movie_vote_wrapper .overlay').unbind('click').bind('click', function () {
                    $(this).unbind('click');
                    blogFunctions.destroy();

                    return false;
                  });
                }
              });
            }
          });
        }

      };

      blogFunctions.getDetailFunction($(this).attr('href'), $(this).data('blogTitle'));
      return false;
    });
  }


  // -----------------------
  // ----------------------- Movie details AJAX -----------------------
  // Time slot expand link
  var bindTimeExpansion = function () {
    if ($('.time_expand').length && $('.time_collapse_bounds').length && $('.content_right').length) {
      $('.time_expand').unbind('click').bind('click', function () {
        var $open = typeof $(this).data('open') == 'undefined' ? false : $(this).data('open');
        var expandedTxt = $(this).data('defaultExpanded');
        var collapsedTxt = $(this).data('defaultCollapsed');

        //if(!$(this).data('defaultText')) $(this).data('defaultText', $(this).text());
        if (!$(this).data('boundsHeight')) $(this).data('boundsHeight', $('.time_collapse_bounds').height());
        if (!$open) {
          $('.time_collapse_bounds').css({'display': 'block', 'height': 0});
          $('.time_collapse_bounds').stop().animate({'height': $(this).data('boundsHeight')}, 600, 'easeInOutExpo', function () {
            $('.content_right').getNiceScroll().resize();
          });
          $(this).addClass('time_collapse');
          $(this).text(expandedTxt);
          $open = true;
        } else {
          $('.time_collapse_bounds').stop().animate({'height': 0}, 600, 'easeInOutExpo', function () {
            $('.content_right').getNiceScroll().resize();
          });
          $(this).text(collapsedTxt);
          $(this).removeClass('time_collapse');
          $open = false;
        }
        $(this).data('open', $open);

        return false;
      });
    }
  };
  bindTimeExpansion();

  if ($('.movie_share').length) {
    $('.movie_share').unbind('click').bind('click', function () {
      return false;
    });
  }

  if ($('.movie_share_hover').length) {
    $('.movie_share_hover').hover(function () {
      $('.movie_share_buttons').addClass('movie_share_buttons_show');
    }, function () {
      $('.movie_share_buttons').removeClass('movie_share_buttons_show');
    });
  }

  if ($('.movie_thumbnail a').length || $('#movie_content').length) {
    // -------------------------------------------------------------
    // Voting function
    // -------------------------------------------------------------
    if ($('.movie_vote').length) {
      var movieVoteXHR = false,
        selectedChoice = false;

      $('.movie_vote').click(function () {
        var self = $(this),
          movieId = self.data('movieId'),
          movieType = self.data('movieType'),
          locationSlug = self.data('locationSlug'),
          isKids = self.data('isKids'),
          voteUrl = SITE_URL + (isKids ? 'kids/vote/' : 'cinemas/vote/'),
          listUrl = SITE_URL + (isKids ? 'kids/get_vote_list' : 'cinemas/get_vote_list') + '/' + movieType + '/' + locationSlug,
          resultUrl = SITE_URL + (isKids ? 'kids/get_vote_results' : 'cinemas/get_vote_results') + '/' + movieType + '/' + locationSlug;

        var voteChoice = '<div id="movie_vote_wrapper">' +
          '<div class="overlay"><!-- --></div>' +
          '<div class="movie_vote_box">' +
          '<a href="#" class="movie_vote_close"><!-- --></a>' +
          '<p class="vote_header">Please choose an option.</p>' +
          '<div class="vote_radio_box">' +
          '<p class="vote_radio_bounds">' +
          '<span class="vote_radio_wrapper"><input type="radio" class="vote_select" name="vote_select" id="vote_select_0" value="0" /></span><label for="vote_select_0">Vote for this movie</label>' +
          '</p>' +
          '<p class="vote_radio_bounds">' +
          '<span class="vote_radio_wrapper"><input type="radio" class="vote_select" name="vote_select" id="vote_select_1" value="1" /></span><label for="vote_select_1">Vote for all movies</label>' +
          '</p>' +
          '<p class="vote_radio_bounds">' +
          '<span class="vote_radio_wrapper"><input type="radio" class="vote_select" name="vote_select" id="vote_select_2" value="2" /></span><label for="vote_select_2">View Results</label>' +
          '</p>' +
          '<a class="movie_vote_continue" href="#"><img title="Continue" alt="Continue" src="' + SITE_URL + 'assets/images/vote_continue.png"></a>' +
          '</div>' +
          '</div>' +
          '</div>';

        $('#container').append($(voteChoice).hide());
        $('#movie_vote_wrapper').width($('#container').width());
        $('#movie_vote_wrapper').height($('#container').height());
        $('#movie_vote_wrapper .movie_vote_box').css('top', $(window).height() / 2);
        $('#movie_vote_wrapper').fadeIn(600, 'easeInOutExpo');

        // Loader
        var loaderWrapper = '<div id="loader_wrapper">' +
          '<div class="overlay"><!-- --></div>' +
          '<div class="loading">' +
          '<p>Loading your request. Please wait.</p>' +
          '</div>' +
          '</div>';

        var voteFunctions = {

          destroy: function () {
            // unbind click handlers
            $('.movie_vote_continue, .movie_vote_results_link, #movie_vote_wrapper .overlay').unbind('click');

            $('#movie_vote_wrapper').fadeOut(600, 'easeInOutExpo', function () {
              $(this).remove();
            });
          },

          showLoader: function () {
            if (!$('#loader_wrapper').length) {
              $('#container').append($(loaderWrapper).hide());
              $('#loader_wrapper').width($('#container').width());
              $('#loader_wrapper').height($('#container').height());
              $('#loader_wrapper .loading').css('top', self.offset().top);
              $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');
            }
          },

          // Kill the XHR
          killXHR: function () {
            if (movieVoteXHR) {
              movieVoteXHR.abort();
              delete movieVoteXHR;
              movieVoteXHR = false;
            }
          },

          // vote function
          submitVoteFunction: function (movie_id) {
            voteFunctions.showLoader();
            voteFunctions.killXHR();

            movieVoteXHR = $.ajax({
              url: voteUrl + movie_id,
              dataType: 'html',
              error: function () {
                $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                  $(this).remove();
                  alert('An un-identified error occured! We\'ll have this sorted out soon');
                });
              },
              success: function (result) {
                if (result == 'Error' || result == 'already_voted') {
                  $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                    $(this).remove();
                    if (result == 'Error') alert('An un-identified error occured! We\'ll have this sorted out soon');
                    else alert('You have already cast a vote for this movie. Sorry... Have a gr8 day :)');
                  });
                } else {
                  $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                    $(this).remove();
                    alert('Your vote for this movie has been submitted.');
                  });
                  //voteFunctions.getResultsFunction();
                }
              }
            });
          },

          // get list function
          getListFunction: function () {
            voteFunctions.showLoader();
            voteFunctions.killXHR();

            movieVoteXHR = $.ajax({
              url: listUrl,
              dataType: 'html',
              error: function () {
                $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                  $(this).remove();
                  alert('An un-identified error occured! We\'ll have this sorted out soon');
                });
              },
              success: function (result) {
                $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                  $(this).remove();

                  if (result == 'Error') {
                    alert('An un-identified error occured! We\'ll have this sorted out soon');
                  } else {
                    $('.movie_vote_box').addClass('movie_vote_box_expanded');
                    $('.vote_header').empty().html('Vote For Movies You Want To see<a href="#" class="movie_vote_results_link">View Results</a>');
                    $('.movie_vote_results_link').unbind('click');

                    if ($('.vote_radio_box').length) {
                      $('.vote_radio_box').fadeOut(600, 'easeInOutExpo', function () {
                        $(this).remove();
                        $('.movie_vote_box').append($(result).hide());
                        $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                          // attach get results handler
                          $('.movie_vote_results_link').unbind('click').bind('click', function () {
                            voteFunctions.getResultsFunction();

                            return false;
                          });

                          // attach the handler for other votes
                          $('.movie_vote_thumbs_up').unbind('click').bind('click', function () {
                            if (!$(this).data('movieId')) return false;
                            voteFunctions.submitVoteFunction($(this).data('movieId'));

                            return false;
                          });

                          // do nice scroll
                          $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                        });
                      });
                    } else {
                      $('.movie_vote_list').fadeOut(600, 'easeInOutExpo', function () {
                        $(this).remove();
                        $('.movie_vote_box').append($(result).hide());
                        $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                          // attach get results handler
                          $('.movie_vote_results_link').unbind('click').bind('click', function () {
                            voteFunctions.getResultsFunction();

                            return false;
                          });

                          // attach the handler for other votes
                          $('.movie_vote_thumbs_up').unbind('click').bind('click', function () {
                            if (!$(this).data('movieId')) return false;
                            voteFunctions.submitVoteFunction($(this).data('movieId'));

                            return false;
                          });

                          // do nice scroll
                          $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                        });
                      });
                    }
                  }
                });
              }
            });
          },

          // get results function
          getResultsFunction: function () {
            voteFunctions.showLoader();
            voteFunctions.killXHR();

            movieVoteXHR = $.ajax({
              url: resultUrl,
              dataType: 'html',
              error: function () {
                $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                  $(this).remove();
                  alert('An un-identified error occured! We\'ll have this sorted out soon');
                });
              },
              success: function (result) {
                $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                  $(this).remove();

                  if (result == 'Error') {
                    alert('An un-identified error occured! We\'ll have this sorted out soon');
                  } else {
                    $('.movie_vote_box').addClass('movie_vote_box_expanded');
                    $('.vote_header').empty().html('Movie Voting Results<a href="#" class="movie_vote_results_link">Back To Voting</a>');
                    $('.movie_vote_results_link').unbind('click');
                    $('.movie_vote_thumbs_up').unbind('click');

                    if ($('.vote_radio_box').length) {
                      $('.vote_radio_box').fadeOut(600, 'easeInOutExpo', function () {
                        $(this).remove();
                        $('.movie_vote_box').append($(result).hide());
                        $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                          // attach get results handler
                          $('.movie_vote_results_link').unbind('click').bind('click', function () {
                            voteFunctions.getListFunction();

                            return false;
                          });

                          // do nice scroll
                          $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                        });
                      });
                    } else {
                      $('.movie_vote_list').fadeOut(600, 'easeInOutExpo', function () {
                        $(this).remove();
                        $('.movie_vote_box').append($(result).hide());
                        $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                          // attach get results handler
                          $('.movie_vote_results_link').unbind('click').bind('click', function () {
                            voteFunctions.getListFunction();

                            return false;
                          });

                          // do nice scroll
                          $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                        });
                      });
                    }
                  }
                });
              }
            });
          }

        };


        // Destroy
        $('.movie_vote_close').unbind('click').bind('click', function () {
          $(this).unbind('click');
          voteFunctions.destroy();

          return false;
        });

        // Radios - get the selected option and add and remove selected class respectively to give selected look
        $('.vote_select').unbind('change').bind('change', function () {
          $('.vote_select').each(function (index, element) {
            if ($(element).is(':checked')) {
              $(element).parent().addClass('vote_radio_wrapper_selected');
              selectedChoice = index;
            } else $(element).parent().removeClass('vote_radio_wrapper_selected');
          });
          return false;
        });

        $('.vote_radio_wrapper').unbind('click').bind('click', function (e) {
          var radio = $(this).children('.vote_select'),
            index = $('.vote_select').index(radio);

          $('input[name=vote_select]:eq(' + index + ')').prop('checked', true);
          $('input[name=vote_select]:eq(' + index + ')').change();
          return false;
        });

        // Continue Button
        $('.movie_vote_continue').unbind('click').bind('click', function () {
          if (selectedChoice === false) return false;

          switch (selectedChoice) {
            case 0:
              voteFunctions.submitVoteFunction(movieId);
              break;

            case 1:
              voteFunctions.getListFunction();
              break;

            case 2:
              voteFunctions.getResultsFunction();
              break;
          }

          return false;
        });

        return false;
      });
    }


    // -------------------------------------------------------------
    // Movie ajax Change function
    // -------------------------------------------------------------
    var movieXHR = false;
    $('.movie_thumbnail a, .movie_schedule_time_bounds .time_title a').click(function () {
      var self = $(this);
      //var cycleAPI = self.parents('.list_slider').data('cycle.API');
      var loaderWrapper = '<div id="loader_wrapper">' +
        '<div class="overlay"><!-- --></div>' +
        '<div class="loading">' +
        '<p>Loading your request. Please wait.</p>' +
        '</div>' +
        '</div>';

      if (movieXHR) {
        movieXHR.abort();
        delete movieXHR;
        movieXHR = false;
      }

      if (!movieXHR) {
        $('#container').append($(loaderWrapper).hide());
        $('#loader_wrapper').width($('#container').width());
        $('#loader_wrapper').height($('#container').height());
        $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');

        movieXHR = $.ajax({
          url: self.attr('href') + '?' + (new Date()).getTime(),
          cache: false,
          dataType: 'json',
          error: function () {
            $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
              $(this).remove();
              $('html, body').animate({'scrollTop': $('#movie_content').offset().top}, 600, 'easeInOutExpo');
              $('.content_right').getNiceScroll().resize();
              if ($('.movie_schedule_popup_outside_click').length && $('.movie_schedule_popup_outside_click').is(':visible')) $('.movie_schedule_popup_outside_click').trigger('click');
              alert('An un-identified error occured! We\'ll have this sorted out soon');
            });
          },
          success: function (result) {
            // Error handling
            if (result == 'Error') {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                $('html, body').animate({'scrollTop': $('#movie_content').offset().top}, 600, 'easeInOutExpo');
                $('.content_right').getNiceScroll().resize();
                if ($('.movie_schedule_popup_outside_click').length && $('.movie_schedule_popup_outside_click').is(':visible')) $('.movie_schedule_popup_outside_click').trigger('click');
                alert('The requested movie does not exist!');
              });
            } else {
              var parent = $('#movie_content'),
                selected_location = result.selected_location,
                selected_movie = result.selected_movie,
                times = result.times,
                show_presale = result.selected_movie.presale_date,
                stSettings = result.stSettings;

              //For Social Media Sharing
              newTitle = selected_movie.title;
              newURL = stSettings.url;
              newSummary = selected_movie.synopsis;
              newImage = selected_movie.poster;

              var appendString = '/'+ selected_movie.slug;
              //alert(newURL);
              window.history.pushState("", "Title", newURL);

              //alert(result.selected_movie.presale_date);

              //META Tags
              $('meta[property="og:url"]').attr('content', stSettings.url);
              $('meta[property="og:title"]').attr('content', stSettings.title);
              $('meta[property="og:description"]').attr('content', stSettings.synopsis);
              $('meta[property="og:image"]').attr('content', newImage);

              //Share this
              /*if(typeof stWidget != 'undefined'){
               console.log(stWidget);
               // Open graph
               $('meta[property="og:url"]').attr('content', stSettings.url);
               $('meta[property="og:title"]').attr('content', stSettings.title);
               $('meta[property="og:description"]').attr('content', stSettings.summary);
               $('meta[property="og:image"]').attr('content', stSettings.image);
               stWidget.ogdesc = stSettings.summary;
               stWidget.ogtitle = stSettings.title;
               stWidget.ogimg = stSettings.image;
               stWidget.ogurl = stSettings.url;
               // Email
               stWidget.addEntry({
               'service': 'email',
               'element': document.getElementById('st_email'),
               'url': stSettings.url,
               'title': stSettings.title,
               'image': stSettings.image,
               'summary': stSettings.summary,
               'type': 'custom'
               });
               // FB
               stWidget.addEntry({
               'service': 'facebook',
               'element': document.getElementById('st_facebook'),
               'url': stSettings.url,
               'title': stSettings.title,
               'image': stSettings.image,
               'summary': stSettings.summary,
               'type': 'custom'
               });
               // Pinterest
               stWidget.addEntry({
               'service': 'pinterest',
               'element': document.getElementById('st_pinterest'),
               'url': stSettings.url,
               'title': stSettings.title,
               'image': stSettings.image,
               'summary': stSettings.summary,
               'type': 'custom'
               });
               // Twitter
               stWidget.addEntry({
               'service': 'twitter',
               'element': document.getElementById('st_twitter'),
               'url': stSettings.url,
               'title': stSettings.title,
               'image': stSettings.image,
               'summary': stSettings.summary,
               'type': 'custom'
               });
               // Google
               stWidget.addEntry({
               'service': 'googleplus',
               'element': document.getElementById('st_google'),
               'url': stSettings.url,
               'title': stSettings.title,
               'image': stSettings.image,
               'summary': stSettings.summary,
               'type': 'custom'
               });
               console.log(stWidget);
               }*/

              if(newTitle != "" && newURL != ""){
                  //Facebook
               /* $('#st_facebook').data('title', newTitle);
                $('#st_facebook').data('url', newURL);
                $('#st_facebook').data('summary', newSummary);
                $('#st_facebook').data('image', newImage);
                */
                //Email
                $('#st_email').data('title', newTitle);
                $('#st_email').data('url', newURL);
                $('#st_email').data('summary', newSummary);
                $('#st_email').data('image', newImage);

                $('#st_email').attr('href', 'mailto:?subject=MovieTowne: '+ newTitle +'&body=Check out this movie on the MovieTowne site: ' + newURL);

                //Twitter
                /*$('#st_twitter').data('title', newTitle);
                $('#st_twitter').data('url', newURL);
                $('#st_twitter').data('summary', newSummary);
                $('#st_twitter').data('image', newImage);*/


                //alert($('#st_facebook').data('url'));
              }

              // Voting
              parent.find('.movie_vote').data('movieId', selected_movie.id);

              // Title
              parent.find('.selected_movie_title').text(selected_movie.title);

              // Synopsis
              parent.find('.selected_movie_synopsis').find('*').not('.movie_yellow').remove();
              parent.find('.selected_movie_synopsis').append(selected_movie.synopsis);

              // Categories
              parent.find('.selected_movie_categories').find('span').not('.movie_yellow').text(selected_movie.categories);

              // Release date
              parent.find('.selected_movie_release_date').find('span').not('.movie_yellow').text(selected_movie.release_date);

              // Run Time
              parent.find('.selected_movie_run_time').find('span').not('.movie_yellow').empty().html($.trim(selected_movie.run_time) == '' ? '<em>Not Available</em>' : selected_movie.run_time);

              // Starring
              parent.find('.selected_movie_starring').find('span').not('.movie_yellow').empty().html($.trim(selected_movie.starring) == '' ? '<em>Not Available</em>' : selected_movie.starring);

              // Director
              parent.find('.selected_movie_director').find('span').not('.movie_yellow').empty().html($.trim(selected_movie.director) == '' ? '<em>Not Available</em>' : selected_movie.director);

              // Rating
              parent.find('.movie_audience_rating_wrapper').find('span').not('.movie_yellow').empty().html($.trim(selected_movie.audience_rating) == '' ? '<em>Not Available</em>' : selected_movie.audience_rating);

              // Rating Description
              parent.find('.selected_movie_rating_desc').find('span').not('.movie_yellow').empty().html($.trim(selected_movie.audience_rating_desc) == '' ? '<em>Not Available</em>' : selected_movie.audience_rating_desc);


              var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();

                if(dd<10) {
                    dd='0'+dd;
                }

                if(mm<10) {
                    mm='0'+mm;
                }

                today = yyyy+'-'+mm+'-'+dd+' 00:00:00';

              // Times
              parent.find('.movie_times').find('.time_block, .time_collapse_bounds, p.movie_yellow, a.time_expand').unbind('click').remove();
              if (show_presale) {
                if(today < selected_movie.release_date){
                  // alert(selected_movie.release_date);
                  //parent.find('.legend_block').addClass('display_none');
                  parent.find('.movie_times').append('<p class="movie_yellow presale_block">OPENS ' + selected_movie.show_date + '.<br />ADVANCE TICKETS ON SALE!</p>');
                  /* parent.find('.content_left .movie_poster').append('<img class="movie_presale<?php echo (trim($selected_movie[\'presale_date\']) != \'\' && ($selected_movie[\'presale_date\'] <= $selected_movie[\'release_date\'])) ? \' display_none\' : \'\';?>" src="<?php echo base_url();?>assets/images/advanced_booking.png" alt="Advance Tickets On Sale" title="Advance Tickets On Sale" />
                  <img class="movie_presale movie_presale_lower<?php echo (trim($selected_movie[\'presale_date\']) != \'\' && ($selected_movie[\'presale_date\'] <= $selected_movie[\'release_date\'])) ? \' display_none\' : \'\';?>" src="<?php echo base_url();?>assets/images/advanced_booking_flipped.png" alt="Advance Tickets On Sale" title="Advance Tickets On Sale" />');

              */
                }
              } else {
                parent.find('.presale_block').remove();
              }

              var ticket_button_path = SITE_URL + 'assets/images/ticket-button.png';
              var ticket_url = '';

              if (!selected_location.web_ticket_url) {
                ticket_url = selected_movie.buy_string;
              }else {
                ticket_url = selected_location.web_ticket_url;
              }

             // alert(ticket_url);

              /*if(selected_location.title != 'VIP Platinum POS' && (selected_movie.show_status == 'now_showing' || show_presale)) {
                parent.find('.buystrip').remove();
                parent.find('.content_right_scroller article header').append('<a class="buystrip" href="' + ticket_url + '"><img src="' + ticket_button_path + '" alt="Buy Ticket Now" title="Buy Ticket Now" /></a>');
              }else{
                parent.find('.buystrip').remove();
              }*/

              /*}else { */
               if(selected_movie.show_status == 'now_showing'){
              if (times == false) parent.find('.legend_block').addClass('display_none');
              else parent.find('.legend_block').removeClass('display_none');
              parent.find('.movie_times').append(times);
              bindTimeExpansion();
              }
               /*}*/

              // Is 3d
              if (selected_movie.is_3d == 'no') parent.find('.is_3d').addClass('display_none');
              else parent.find('.is_3d').removeClass('display_none');

              // Poster
              var new_poster = $('<img>');
              new_poster.attr('alt', selected_movie.title);
              new_poster.attr('title', selected_movie.title);
              new_poster.addClass('movie_poster_img');
              new_poster.load(function () {


                // Presale date
                if (!show_presale) {
                  parent.find('.movie_presale').fadeOut(1800, 'easeInOutExpo', function () {
                    $('.movie_presale').addClass('display_none');
                  });
                } else {
                  if(today < selected_movie.release_date) {
                    parent.find('.movie_presale').fadeIn(1800, 'easeInOutExpo', function () {
                      $('.movie_presale').removeClass('display_none');
                    });
                  }else if(today >= selected_movie.release_date) {
                    parent.find('.movie_presale').fadeOut(1800, 'easeInOutExpo', function () {
                      $('.movie_presale').addClass('display_none');
                    });
                  }
                }
                $(this).next('.movie_poster_img').fadeOut(600, 'easeInOutExpo', function () {
                  $(this).remove();
                  new_poster.fadeIn(1800, 'easeInOutExpo');
                });
              });
              new_poster.attr('src', selected_movie.poster);
              parent.find('.movie_poster_img').before(new_poster.hide());
              //centerImage(new_poster, 620);

              // Audience Rating
//              /parent.find('.movie_audience_rating_wrapper').html(selected_movie.audience_rating);

              // Video trailer
              if ($.trim(selected_movie.video) == '') parent.find('.record_video').attr('href', SITE_URL + 'assets/images/videoplaceholder').html5lightbox();
              else parent.find('.record_video').attr('href', selected_movie.video).html5lightbox();

              if ($.trim(selected_movie.video) == '') parent.find('.play_trailer').hide();
              else parent.find('.play_trailer').attr('href', selected_movie.video).html5lightbox();

              // Add the active class to the thumbnail
              $('.movie_thumbnail').removeClass('active2');
              self.parents('.movie_thumbnail').addClass('active2');
            }
            $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
              $(this).remove();
              $('html, body').animate({'scrollTop': $('#movie_content').offset().top}, 600, 'easeInOutExpo');
              $('.content_right').getNiceScroll().resize();
              if ($('.movie_schedule_popup_outside_click').length && $('.movie_schedule_popup_outside_click').is(':visible')) $('.movie_schedule_popup_outside_click').trigger('click');
            });
          }
        });
      }

      return false;
    });
  }


  // Tabs
  if ($('.tabs').length) $('.tabs').tabs({
    activate: function (event, ui) {
      if ($('.content_body_blue_inner').getNiceScroll().length) {
        $('.content_body_blue_inner').getNiceScroll().hide();
        $('.content_body_blue_inner').getNiceScroll().resize();
        $('.content_body_blue_inner').getNiceScroll().show();
      }

      if ($('.content_banquet_inner').getNiceScroll().length) {
        $('.content_banquet_inner').getNiceScroll().hide();
        $('.content_banquet_inner').getNiceScroll().resize();
        $('.content_banquet_inner').getNiceScroll().show();
      }
    }
  });

  // Nice scroll - grey content area
  if ($('.content_right').length) {
    // Special msnry
    /*if($('.content_right').find('.specials_inner').length){
     var $container = $('.specials_inner');
     var $msnryOpts = {
     itemSelector: 'a',
     transitionDuration: 0
     };

     $container.find('img').each(function(index, element) {
     $(element).attr('src', '');
     });

     $container.imageloader({
     selector: '.preload',
     each: function(elm){
     console.log(elm);
     },
     callback: function(elm){
     $container.masonry($msnryOpts);
     }
     });
     }*/

    // Nice scroll
    $(".content_right").niceScroll(".content_right_scroller", $niceScrollBlackOpts);
  }

  // Nice scroll - gbluerey content area
  if ($('.content_body_blue_inner').length) {
    $(".content_body_blue_inner").niceScroll(".content_body_blue_grad_scroller", $niceScrollBlueOpts);
  }

  // Nice scroll - banquet content area
//  if ($('.content_banquet_inner').length) {
//    $(".content_banquet_inner").niceScroll(".content_banquet_scroller", $niceScrollBanquetOpts);
//  }

  $(".content_banquet_inner").jScrollPane({
    autoReinitialise: true
  });

  $(".content_body_blue_inner2").jScrollPane({
    autoReinitialise: true
  });

  $(".scroll_wrapper").jScrollPane({
    autoReinitialise: true
  });

  $(".scroll_wrapper_event").jScrollPane({
    autoReinitialise: true
  });


  // Movie Schedule
  if ($('.movie_schedule_slider').length) {
    $opts = {
      'auto-height': false,
      fx: 'scrollHorz',
      slides: '> div.movie_schedule_time_bounds',
      'allow-wrap': true,
      easing: 'easeInOutExpo',
      speed: 1000,
      timeout: 0,
      next: '.movie_schedule_next',
      prev: '.movie_schedule_prev',
      pager: '.movie_schedule_days',
      pagerActiveClass: 'active2'
    };

    // Nice scroll - movie schedule
    $('.movie_schedule_slider').on('cycle-after', function (event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
      if (!$(incomingSlideEl).getNiceScroll().length) {
        var scroller = $(incomingSlideEl).children(".movie_schedule_time_bounds_scroller");
        $(incomingSlideEl).niceScroll(scroller, $niceScrollBlackOpts);
      } else {
        $(incomingSlideEl).getNiceScroll().hide();
        $(incomingSlideEl).getNiceScroll().resize();
        $(incomingSlideEl).getNiceScroll().show();
      }

      if ($(incomingSlideEl).data('sliderDate')) $('.movie_schedule_current_date').text($(incomingSlideEl).data('sliderDate'));
    });

    // Nice scroll - movie schedule
    $('.movie_schedule_slider').on('cycle-post-initialize', function (event, optionHash) {
      var slides = optionHash.slides,
        startSlide = $(slides[0]);

      if (!startSlide.getNiceScroll().length) {
        var scroller = startSlide.children(".movie_schedule_time_bounds_scroller");
        startSlide.niceScroll(scroller, $niceScrollBlackOpts);
      } else {
        startSlide.getNiceScroll().hide();
        startSlide.getNiceScroll().resize();
        startSlide.getNiceScroll().show();
      }
      if (startSlide.data('sliderDate')) $('.movie_schedule_current_date').text(startSlide.data('sliderDate'));
    });

    // Start the slider
    $('.movie_schedule_slider').cycle($opts);

    // Attach the event to the button
    $('.movie_schedule_button, .movie_schedule_popup_outside_click').unbind('click').bind('click', function () {
      var $button = $('.movie_schedule_button');
      var $open = !$button.data('open') ? false : $button.data('open');
      if (!$open) {
        $open = true;
        $('.movie_schedule_popup').stop().fadeIn(1000, 'easeInOutExpo', function () {
          $('.movie_schedule_time_bounds').each(function (index, element) {
            if (!$(element).getNiceScroll().length) {
              var scroller = $(element).children('.movie_schedule_time_bounds_scroller');
              $(element).niceScroll(scroller, $niceScrollBlackOpts);
            } else {
              $(element).getNiceScroll().hide();
              $(element).getNiceScroll().resize();
              $(element).getNiceScroll().show();
            }
          });
        });
      } else {
        $open = false;
        $('.movie_schedule_popup').stop().fadeOut(1000, 'easeInOutExpo');
      }
      $button.data('open', $open);

      return false;
    });

    // Print function
    $('.movie_schedule_print').unbind('click').bind('click', function () {
      if ($('.movie_schedule_slider_print').length) $('.movie_schedule_slider_print').remove();
      var mode = $(this).data('printMode'),
        schedule_clone = $('.movie_schedule_slider').clone();

      schedule_clone.addClass('movie_schedule_slider_print');
      schedule_clone.find('.cycle-sentinel, .nicescroll-rails').remove();
      if (mode == 'current') schedule_clone.find('.cycle-slide').not('.cycle-slide-active').remove();
      schedule_clone.find('.movie_schedule_time_bounds, .movie_schedule_time_bounds_scroller').removeAttr('style');
      schedule_clone.find('.movie_schedule_time_bounds').each(function (index, element) {
        $(this).before($('.movie_schedule_legend').clone().empty().html('<div class="time_block"><div class="time_title">' + $(this).data('sliderDate') + '</div></div>'));
        $(this).before($('.movie_schedule_legend').clone());
      });

      $('body').append(schedule_clone);
      window.print();

      return false;
    });
  }

  // Home page fade slider
  if ($('.home_page_nav_slider').length) {
    $opts = {
      fx: 'carousel',
      carouselVisible: 4,
      slides: 'div.slide',
      easing: 'easeInOutExpo',
      speed: 600,
      timeout: 0,
      next: '.home_nav_slider_next',
      prev: '.home_nav_slider_prev'
    };

    // Start the slider
    $('.home_page_nav_slider').cycle($opts);
  }

  // Home page vertical sliders
  if ($('.home_vertical_slider').length) {
    // autHeight ratio = filmstripW (170): filmstripH[201]*numPerCol[3] (603)

    $opts = {
      //fx: 'scrollVert',
      fx: 'carousel',
      autoHeight: '170:603',
      carouselVisible: 3,
      carouselVertical: true,
      pauseOnHover: true,
      slides: '> div.slide',
      allowWrap: true,
      easing: 'easeInOutExpo',
      speed: 1500,
      timeout: 0,
      next: '.home_vertical_slider_next_left',
      prev: '.home_vertical_slider_prev_left'
    };

    // Start the sliders
    $('.home_vertical_slider_left').cycle($opts);

    $opts.next = '.home_vertical_slider_next_right';
    $opts.prev = '.home_vertical_slider_prev_right';
    $('.home_vertical_slider_right').cycle($opts);
  }

  // Home page fade slider
  if ($('.home_fade_slider').length) {
    $opts = {
      fx: 'fade',
      slides: '> div.slide',
      pauseOnHover: true,
      allowWrap: true,
      easing: 'easeInOutExpo',
      speed: 2000,
      timeout: 6000,
      pager: '.gallery_canvas_pager',
      pagerTemplate: '<a href="#"></a>'
    };

    // Start the slider
    $('.home_fade_slider').cycle($opts);
  }


  // Center logos
  /*if($('.content_logo').find('img').length){
   $('.content_logo').find('img').each(function(i, v){
   $(v).load(function(){
   centerImage($(this), 120);
   });
   });
   }*/

  // List sliders
  if ($('.list_slider').length) {
    $opts = {
      'auto-height': true,
      fx: 'scrollHorz',
      slides: '> div.slide',
      'allow-wrap': true,
      easing: 'easeInOutExpo',
      speed: 600,
      timeout: 0,
      next: '.list_slider_next',
      prev: '.list_slider_prev'
    };

    // Thumbnail hover popup
    if ($('.list_slider .thumbnail').length) {
      $('.list_slider .thumbnail').each(function (index, element) {
        element = $(element);
        var popup = element.find('.hover_details');
        var top;
        if (popup.length) {
          // Center the header images
          /*popup.find('img').load(function(){
           centerImage($(this), 120);
           });*/

          // Do hover
          /*element.hover(function(e){
           top = (element.height()/2) - (popup.height()/2);
           popup.css({'top': top + 'px'});
           popup.stop().fadeIn(300, 'easeInCirc');
           element.addClass('active');
           }, function(e){
           popup.stop().fadeOut(300, 'easeOutCirc');
           element.removeClass('active');
           });*/

          //var popup = element.find('.hover_details');
          //var top;
          //if(popup.length){
          // Do hover
          element.hover(function (e) {
            top = (element.height() / 2) - (popup.height() / 2);
            popup.css({'top': top + 'px'});
            if ((popup.offset().left + popup.width()) > ($('.list_slider').offset().left + $('.list_slider').width() - 260)) {
              popup.css({'right': '-100%'});
            }
            popup.addClass('hover_details_visible');
            element.addClass('active');
          }, function (e) {
            popup.removeClass('hover_details_visible');
            element.removeClass('active');
          });
          //}
        }
      });
    }

    $('.list_slider').on('cycle-after', function (event, opts) {
      $(this).css({'overflow': 'visible'});
    });

    // Center images on startup
    /*if($('.list_slider .thumb').length){
     $('.list_slider .thumb').each(function(i, v){
     $(v).load(function(){
     centerImage($(this), 120);
     });
     });
     }

     // Center the others as they are loaded into slider
     $('.list_slider').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag){
     var imgs = $(incomingSlideEl).find('.thumb');
     if(imgs.length){
     $(imgs).each(function(index, element) {
     $(v).load(function(){
     centerImage($(this), 120);
     });
     $(v).trigger('load');
     });
     }
     });*/

    // Start the slider
    $('.list_slider').cycle($opts);
  }


  // Calendar slide transition
  if ($('.calendar').length || $('.event_select').length) {
    var calendarXHR = false;
    var calendarFunctions = {
      hoverPopup: function () {
        // Calendar hover popup
        if ($('.calendar .highlight').length) {
          $('.calendar .highlight').each(function (index, element) {
            element = $(element);
            var popup = element.find('.hover_details');
            var top;
            if (popup.length) {
              // Do hover
              element.hover(function (e) {
                top = (element.height() / 2) - (popup.height() / 2);
                popup.css({'top': top + 'px'});
                if ((popup.offset().left + popup.width()) > ($('.calendar').offset().left + $('.calendar').width() - 260)) {
                  popup.css({'left': '-180%'});
                }
                popup.addClass('hover_details_visible');
                element.addClass('active2');
              }, function (e) {
                popup.removeClass('hover_details_visible');
                element.removeClass('active2');
              });
            }
          });
        }
      },
      unbindHover: function () {
        $('.calendar .highlight').hover(null);
      },
      clearEmptyLinkClick: function () {
        $('.calendar .highlight').find('a').each(function (index, element) {
          $(this).unbind('click').bind('click', function () {
            if ($(this).attr('href') == '#') return false;
          });
        });
      },
      doCalendarAjax: function (url) {
        if (typeof url == 'undefined' || !url) return false;

        var parent = $('.calendar');
        var loaderWrapper = '<div id="loader_wrapper">' +
          '<div class="overlay"><!-- --></div>' +
          '<div class="loading">' +
          '<p>Loading your request. Please wait.</p>' +
          '</div>' +
          '</div>';

        if (calendarXHR) {
          calendarXHR.abort();
          delete calendarXHR;
          calendarXHR = false;
        }

        if (!calendarXHR) {
          $('#container').append($(loaderWrapper).hide());
          $('#loader_wrapper').width($('#container').width());
          $('#loader_wrapper').height($('#container').height());
          $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');

          calendarXHR = $.ajax({
            url: url,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              result = $(result.trim());

              calendarFunctions.unbindHover();
              $('.calendar_date').text(result.find('.calendar_date').text());
              parent.find('.slide').each(function (index, element) {
                $(this).remove();
              });
              result.find('.slide').each(function (index, element) {
                parent.find('tbody').append($(this));
              });
              $('.movie_schedule_prev').attr('href', result.find('.movie_schedule_prev').attr('href'));
              $('.movie_schedule_next').attr('href', result.find('.movie_schedule_next').attr('href'));
              parent.data({'year': result.data('year'), 'month': result.data('month')});

              calendarFunctions.clearEmptyLinkClick();
              calendarFunctions.hoverPopup();
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
              });
            }
          });
        }
      },
      doListAjax: function (url) {
        if (typeof url == 'undefined' || !url) return false;

        var parent = $('.event_list_bounds');
        var loaderWrapper = '<div id="loader_wrapper">' +
          '<div class="overlay"><!-- --></div>' +
          '<div class="loading">' +
          '<p>Loading your request. Please wait.</p>' +
          '</div>' +
          '</div>';

        if (calendarXHR) {
          calendarXHR.abort();
          delete calendarXHR;
          calendarXHR = false;
        }

        if (!calendarXHR) {
          $('#container').append($(loaderWrapper).hide());
          $('#loader_wrapper').width($('#container').width());
          $('#loader_wrapper').height($('#container').height());
          $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');

          calendarXHR = $.ajax({
            url: url,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              result = $(result.trim());

              parent.find('.event_list .read_more').unbind('click');
              result.find('.event_list .read_more').unbind('click').bind('click', function () {
                var timeout = false;
                // Events flagged with designate_page
                if ($(this).attr('href') != '#') return true;
                else {
                  var description = $(this).prev('.description'),
                    details = description.find('.desc_inner'),
                    isOpen = description.data('open');

                  if (!description.data('baseHeight')) description.data('baseHeight', description.height());
                  if (isOpen) {
                    description.css({'height': parseInt(description.data('baseHeight')) + 'px'});
                    $(this).text('Read More');
                  } else {
                    description.css({'height': parseInt(details.outerHeight()) + 'px'});
                    $(this).text('Collapse');
                  }
                  description.data('open', !isOpen);
                  if ($('.content_body_blue_inner').getNiceScroll().length) {
                    timeout = setTimeout(function () {
                      $('.content_body_blue_inner').getNiceScroll().hide();
                      $('.content_body_blue_inner').getNiceScroll().resize();
                      $('.content_body_blue_inner').getNiceScroll().show();
                      clearInterval(timeout);
                    }, 600);
                  }
                  return false;
                }
              });
              parent.fadeOut(600, 'easeInOutExpo', function () {
                $(this).replaceWith(result.hide());
                result.fadeIn(600, 'easeInOutExpo');
              });
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
              });
            }
          });
        }
      }
    };
    calendarFunctions.clearEmptyLinkClick();
    calendarFunctions.hoverPopup();

    if ($('.calendar').length) {
      $('.movie_schedule_prev, .movie_schedule_next').click(function () {
        calendarFunctions.doCalendarAjax($(this).attr('href'));
        return false;
      });
    }

    if ($('.event_select').length) {
      // Startup disabling
      var $startupKey = $('#event_location_select').find('option:selected').data('key');
      if ($startupKey != 'POS') {
        $('#event_category_select').parents('.event_select').addClass('disabled');
        $('#event_category_select').prop('disabled', true);
      } else {
        $('#event_category_select').parents('.event_select').removeClass('disabled');
        $('#event_category_select').prop('disabled', false);
      }

      // Change
      $('.event_select').find('select').unbind('change').bind('change', function () {
        var $key = $(this).find('option:selected').data('key'),
          $location = $('#event_location_select'),
          $category = $('#event_category_select');

        var action = $(this).find('option:selected').data('action');
        if ($key != 'POS' && (typeof action == 'undefined' || !action)) return false;

        switch ($(this).attr('id')) {
          case 'event_location_select':
            if ($key != 'POS') {
              $category.parents('.event_select').addClass('disabled');
              $category.find('option:eq(0)').prop('selected', true).siblings('option').prop('selected', false);
              $('#event_location_select, #event_category_select').find('option').each(function (index, element) {
                $(this).data('selectedCategory', $('#event_category_select').find('option:selected').val());
              });
              $category.prop('disabled', true);
            } else {
              $category.parents('.event_select').removeClass('disabled');
              $category.prop('disabled', false);
            }
            $('#event_location_select, #event_category_select').find('option').each(function (index, element) {
              $(this).data('selectedLocation', $('#event_location_select').find('option:selected').val());
            });
            break;

          case 'event_category_select':
            $('#event_location_select, #event_category_select').find('option').each(function (index, element) {
              $(this).data('selectedCategory', $('#event_category_select').find('option:selected').val());
            });
            break;

          default:
            break;
        }

        var $selectedLocation = $(this).find('option:selected').data('selectedLocation'),
          $selectedCategory = $(this).find('option:selected').data('selectedCategory')

        if ($('.calendar').length) {
          action += $selectedCategory + '/' + $selectedLocation + '/' + $('.calendar').data('year') + '/' + $('.calendar').data('month');
          calendarFunctions.doCalendarAjax(action);
        } else {
          action += $selectedCategory + '/' + $selectedLocation + '/' + $('.event_list_bounds').data('year') + '/' + $('.event_list_bounds').data('month');
          calendarFunctions.doListAjax(action);
        }
      });
    }
  }

  //---------------------------------------------------------------
  //---------------------------------------------------------------
  // Event list expand/collapse & category filter
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  if ($('.event_list .read_more').length || $('.specials .read_more').length) {
    $('.event_list .read_more, .specials .read_more').unbind('click').bind('click', function () {
      var timeout = false;
      // Events flagged with designate_page
      if ($(this).attr('href') != '#') return true;
      else {
        var description = $(this).prev('.description'),
          details = description.find('.desc_inner'),
          isOpen = description.data('open');

        if (!description.data('baseHeight')) description.data('baseHeight', description.height());
        if (isOpen) {
          description.css({'height': parseInt(description.data('baseHeight')) + 'px'});
          $(this).text('Read More');
        } else {
          description.css({'height': parseInt(details.outerHeight()) + 'px'});
          $(this).text('Collapse');
        }
        description.data('open', !isOpen);
        if ($('.content_body_blue_inner').getNiceScroll().length) {
          timeout = setTimeout(function () {
            $('.content_body_blue_inner').getNiceScroll().hide();
            $('.content_body_blue_inner').getNiceScroll().resize();
            $('.content_body_blue_inner').getNiceScroll().show();
            clearInterval(timeout);
          }, 600);
        }
        return false;
      }
    });
  }


  // Canvas Slider
  if ($('.gallery_canvas_slider').length && $('.gallery_canvas').length) {
    $opts = {
      'auto-height': true,
      fx: 'scrollHorz',
      slides: '> div',
      'allow-wrap': true,
      'pause-on-hover': true,
      easing: 'easeInOutExpo',
      speed: 1000,
      timeout: 6000,
      next: '.gallery_slider_next',
      prev: '.gallery_slider_prev',
      pager: '.gallery_canvas_pager',
      pagerTemplate: '<a href="#"></a>'
    };

    // Is canvas supported? - If not, do cycle
    if (!isCanvasSupported()) {
      // create the gallery
      $('.gallery_canvas_slider').cycle($opts);
    } else { // Let's do the canvas bit...
      var $slider = $('.gallery_canvas'),
        mw = 960,
        mh = 420,
        btn_w = 52,
        btn_h = 52,
        rad = 50,
        hr = rad / 2,
        b = 10,
        hb = b / 2,
        context = $slider[0].getContext('2d'),
        cur_slide = 0,
        x_animate = 0,
        cur_image,
        next_image,
        $forwardFlag = true,
        percentage = 100;

      var canvasFunctions = {
        render: function (startup) {
          w = parseInt($slider.attr('width')) - hb;
          hw = w / 2;
          h = parseInt($slider.attr('height')) - hb;
          hh = h / 2;

          // Create gradient
          var grd = context.createLinearGradient(0, 0, $slider.width() / 2, 0);
          grd.addColorStop(0, "#26397f");
          grd.addColorStop(1, "#0669ad");

          context.beginPath();
          context.moveTo(hb, hb); // Create a starting point
          context.lineTo(w, hb);
          context.lineTo(w, hh - hr);
          context.bezierCurveTo(w - rad, hh - hr, w - rad, hh + rad, w, hh + rad);
          context.lineTo(w, h);
          context.lineTo(hb, h);
          context.lineTo(hb, hh + rad);
          context.bezierCurveTo(hb + rad, hh + rad, hb + rad, hh - hr, hb, hh - hr);
          context.lineTo(hb, hb);
          context.closePath();
          context.lineWidth = b;
          context.strokeStyle = grd;
          context.stroke();
          context.fillStyle = grd;
          context.fill();

          context.save();
          context.clip();

          var curX = $(cur_image).data('x'),
            curY = $(cur_image).data('y');

          if (startup || !next_image) context.drawImage(cur_image, curX, curY);
          else {
            context.drawImage(cur_image, parseInt(x_animate + curX), curY);
            if (next_image) {
              var nextX = $(next_image).data('x'),
                nextY = $(next_image).data('y');
              context.drawImage(next_image, parseInt(x_animate + ($forwardFlag ? w : -w) + nextX), nextY);
            }
          }
          context.restore();
        },
        resize: function (startup) {
          var cur_img = $('.gallery_canvas_slider div img')[cur_slide];
          percentage = ($(cur_img).width() / mw) * 100;
          $('.gallery_canvas_wrapper .slider_btn_lft, .gallery_canvas_wrapper .slider_btn_rgt').css({'width': (btn_w / 100) * percentage, 'height': (btn_h / 100) * percentage});

          $slider.attr('width', Math.min(mw, $(cur_img).width()));
          $slider.attr('height', Math.min(mh, $(cur_img).height()));

          // Render
          canvasFunctions.render(startup);
        }
      };


      $('.gallery_canvas_slider').on('cycle-bootstrap', function (e, optionHash, API) {
        // replace "doTransition" method with custom impl
        API.doTransition = function (slideOptions, currEl, nextEl, fwdFlag, callback) {
          // custom implementation
          var opts = slideOptions;
          var curr = $(currEl),
            next = $(nextEl);
          var fn = function () {
            // make sure animIn has something so that callback doesn't trigger immediately
            next.animate(opts.animIn || { opacity: 1}, opts.speed, opts.easeIn || opts.easing, callback);
          };

          next.css(opts.cssBefore || {});
          curr.animate(opts.animOut || {}, {
            'duration': opts.speed,
            'easing': opts.easeOut || opts.easing,
            'progress': function (animation, progress, remainingMs) {
              x_animate = parseInt($(animation.elem).css('left'));
              canvasFunctions.render();
            }
          }, function () {
            curr.css(opts.cssAfter || {});
            if (!opts.sync) {
              fn();
            }
          });

          if (opts.sync) {
            fn();
          }
        }
      });


      $('.gallery_canvas_slider').on('cycle-initialized', function (event, opts) {
        // your event handler code here
        // argument opts is the slideshow's option hash
        var cur_slide = opts.slides[opts.currSlide];
        var cur_slide_img = $(cur_slide).find('img');

        var load_img = $('<img/>');
        $(load_img).load(function () {
          cur_image = load_img[0];
          $(cur_image).data($(cur_slide_img).data());

          canvasFunctions.resize(true);
        });
        load_img.attr('src', $(cur_slide_img).attr('src'));
      });

      $('.gallery_canvas_slider').on('cycle-before', function (event, opts, outgoingSlideEl, incomingSlideEl, forwardFlag) {
        // your event handler code here
        // argument opts is the slideshow's option hash
        var cur_slide_img = $(outgoingSlideEl).find('img');
        var next_slide_img = $(incomingSlideEl).find('img');

        cur_image = cur_slide_img[0];
        $(cur_image).data($(cur_slide_img).data());

        next_image = next_slide_img[0];
        $(next_image).data($(next_slide_img).data());

        $forwardFlag = forwardFlag;
      });


      // Resize & re-render the canvas
      $(window).resize(function () {
        canvasFunctions.resize(false);
      });

      // create the gallery && change the workspace up
      $('.gallery_canvas_slider div').css({'visibility': 'hidden'});
      $('.gallery_canvas_inner').addClass('gallery_canvas_inner_no_border');
      $('.gallery_canvas_wrapper .slider_btn_lft, .gallery_canvas_wrapper .slider_btn_rgt').addClass('canvas_btn');
      $('.gallery_canvas_wrapper .shadow').addClass('canvas_shadow');
      $('.gallery_canvas_slider').cycle($opts);
    }
  }

  // Destroy
  $('.main-wrap').unbind('click').bind('click', function () {
    /*$(this).unbind('click');

    formGetFunctions.destroy();
    $("body, html").removeClass("noscroll");
    return false;*/

    //alert("aaaaaaaaaaaaaaaaa");

  });

  /*$(document).click(function(e) {
    if (!$(e.target).parents().andSelf().is('.movie_vote_box')) {
      //disablePopup();
      alert("aaaaaa");
    }
  });*/


  //---------------------------------------------------------------
  //---------------------------------------------------------------
  // Ajax Forms && Form Popups
  //---------------------------------------------------------------
  //---------------------------------------------------------------
  if ($('.form_popup_link').length) {
    var formGetXHR = false;
    $('.form_popup_link').unbind('click').bind('click', function () {

     /*close: function( event, ui ) {
          //$(this).dialog('destroy');
      alert("aaaaa");
      } */

    var self = $(this);
      if ($.trim(self.attr('href')) == '' || self.attr('href') == '#') return false;

      // Loader
      var loaderWrapper = '<div id="loader_wrapper">' +
        '<div class="overlay"><!-- --></div>' +
        '<div class="loading">' +
        '<p>Loading your request. Please wait.</p>' +
        '</div>' +
        '</div>';

      var formGetFunctions = {

        destroy: function () {
          // unbind click handlers
          $('.movie_vote_close, #movie_vote_wrapper .overlay').unbind('click');
          $('#movie_vote_wrapper').fadeOut(600, 'easeInOutExpo', function () {
            $(this).remove();
          });
        },

    showLoader: function () {
          if (!$('#loader_wrapper').length) {
            $('#container').append($(loaderWrapper).hide());
            $('#loader_wrapper').width($('#container').width());
            $('#loader_wrapper').height($('#container').height());
            $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');
          }
        },

        // Kill the XHR
        killXHR: function () {
          if (formGetXHR) {
            formGetXHR.abort();
            delete formGetXHR;
            formGetXHR = false;
          }
        },

        // get the form
        getForm: function (url) {
          if (!url || typeof url == 'undefined') return false;
          formGetFunctions.showLoader();
          formGetFunctions.killXHR();
          formGetXHR = $.ajax({
            url: url,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                $("body, html").addClass('noscroll'); /* Ratch fix for the popups */

                /* More ratch fixes for popups, specifically homepage */
                if ($(document).find("title").text() == 'Home | Movie Towne') {
                  $('html, body').animate({ scrollTop: 0 }, 'slow');
                }

                var contentBox = '<div id="movie_vote_wrapper">' +
                  '<div class="overlay"><!-- --></div>' +
                  '<div class="movie_vote_box movie_vote_box_expanded' + (self.data('isBanquet') ? ' banquet_form_popup' : '') + '">' +
                  '<a href="#" class="movie_vote_close"><!-- --></a>' +
                  (typeof self.data('isBanquet') == 'undefined' ? '<p class="vote_header">&nbsp;</p>' : '') +
                  '</div>' +
                  '</div>';

                $('#container').append($(contentBox).hide());
                $('#movie_vote_wrapper').width($('#container').width());
                $('#movie_vote_wrapper').height($('#container').height());
                $('#movie_vote_wrapper').fadeIn(600, 'easeInOutExpo');
                $('.movie_vote_box').append($($.parseHTML(result)).hide());
                $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                  // do nice scroll
                  $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', self.data('isBanquet') ? $niceScrollBanquetOpts : $niceScrollBlueOpts);
                  // Add form function
                  $('.ajax_form').validate({
                    debug: true,
                    errorElement: 'span',
                    errorPlacement: function (error, element) {
                      if (element.is('input[type="radio"]') || element.is('input[type="checkbox"]')) {
                        element.parents('.radio_wrap').after(error.hide());
                      } else element.parent().after(error.hide());
                      error.fadeIn(600, 'easeInOutExpo');
                      $('.movie_vote_list').getNiceScroll().resize();
                    },
                    rules: {
                      e_time_meridian: {
                        goodEndTime: true
                      }
                    },
                    submitHandler: function (form) {

                      form.submit();
                    }
                  });
                });

                // Destroy
                $('.movie_vote_close').unbind('click').bind('click', function () {
                  $(this).unbind('click');

                  formGetFunctions.destroy();
                  $("body, html").removeClass("noscroll"); /* Ratch fix for popups */
                  return false;

                });


        //Popup close if click outside of the popup
        $(document).click(function(e) {
          if (!$(e.target).parents().andSelf().is('.movie_vote_box')) {
            //disablePopup();

            $(this).unbind('click');

             formGetFunctions.destroy();
              $("body, html").removeClass("noscroll"); /* Ratch fix for popups */
              return false;

          }
        });

              });
            }
          });
        }
      };

      formGetFunctions.getForm(self.attr('href'));

      return false;
    });
  }

  if ($('.ajax_form').length) {

    // Add form function
    $('.ajax_form').validate({
      errorElement: 'span',
      errorPlacement: function (error, element) {
        if (element.is('input[type="radio"]') || element.is('input[type="checkbox"]')) {
          element.parents('.radio_wrap').after(error.hide());
        } else element.parent().after(error.hide());
        error.fadeIn(600, 'easeInOutExpo');
      }, rules: {
        e_time_meridian: {
          goodEndTime: true
        }
      },
      submitHandler: function (form) {

        form.submit();
      }
    });

    /*var blogXHR = false;
     $('.popup_link, .thumbnail_wrapper a').not('.event_list .thumbnail_wrapper a').unbind('click').bind('click', function(){
     if(!$(this).data('blogTitle')) return false;

     var self = $(this);

     // Loader
     var loaderWrapper = '<div id="loader_wrapper">' +
     '<div class="overlay"><!-- --></div>' +
     '<div class="loading">' +
     '<p>Loading your request. Please wait.</p>' +
     '</div>' +
     '</div>';

     var blogFunctions = {

     destroy: function(){
     // unbind click handlers
     $('.movie_vote_close, #movie_vote_wrapper .overlay').unbind('click');

     $('#movie_vote_wrapper').fadeOut(600, 'easeInOutExpo', function(){
     $(this).remove();
     });
     },

     showLoader: function(){
     if(!$('#loader_wrapper').length){
     $('#container').append($(loaderWrapper).hide());
     $('#loader_wrapper').width($('#container').width());
     $('#loader_wrapper').height($('#container').height());
     $('#loader_wrapper .loading').css('top', self.offset().top);
     $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');
     }
     },

     // Kill the XHR
     killXHR: function(){
     if(blogXHR){
     blogXHR.abort();
     delete blogXHR;
     blogXHR = false;
     }
     },

     // get detail function
     getDetailFunction: function(url, title){
     if(!url || typeof url == 'undefined' || !title || typeof title == 'undefined') return false;

     blogFunctions.showLoader();
     blogFunctions.killXHR();
     blogXHR = $.ajax({
     url: url,
     dataType: 'html',
     error: function(){
     $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function(){
     $(this).remove();
     alert('An un-identified error occured! We\'ll have this sorted out soon');
     });
     },
     success: function(result){
     $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function(){
     $(this).remove();

     if(result == 'Error'){
     alert('An un-identified error occured! We\'ll have this sorted out soon');
     }else {

     var contentBox = '<div id="movie_vote_wrapper">' +
     '<div class="overlay"><!-- --></div>' +
     '<div class="movie_vote_box movie_vote_box_expanded">' +
     '<a href="#" class="movie_vote_close"><!-- --></a>' +
     '<p class="vote_header">' + title + '</p>' +
     '</div>' +
     '</div>';

     $('#container').append($(contentBox).hide());
     $('#movie_vote_wrapper').width($('#container').width());
     $('#movie_vote_wrapper').height($('#container').height());
     $('#movie_vote_wrapper .movie_vote_box').css('top', $(window).height()/2);
     $('#movie_vote_wrapper').fadeIn(600, 'easeInOutExpo');

     $('.movie_vote_box').append($(result).hide());
     $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function(){
     // do nice scroll
     $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
     });

     // Destroy
     $('.movie_vote_close, #movie_vote_wrapper .overlay').unbind('click').bind('click', function(){
     $(this).unbind('click');
     blogFunctions.destroy();

     return false;
     });
     }
     });
     }
     });
     }

     };

     blogFunctions.getDetailFunction($(this).attr('href'), $(this).data('blogTitle'));
     return false;
     });*/
  }


  // -------------------------------------------------------------
  // Leasing function
  // -------------------------------------------------------------
  if ($('.leasing').length) {
    var leasingXHR = false,
      selectedChoice = false;

    $('.leasing').click(function () {
      var self = $(this),
        leaseType = self.data('leaseType') || 'default',
        infoUrl = SITE_URL + 'corporate/leasing_info',
        listUrl = SITE_URL + 'corporate/get_lease_list/' + leaseType,
        formUrl = SITE_URL + 'corporate/leasing_form/' + leaseType;

      var voteChoice = '<div id="movie_vote_wrapper">' +
        '<div class="overlay"><!-- --></div>' +
        '<div class="movie_vote_box">' +
        '<a href="#" class="movie_vote_close"><!-- --></a>' +
        '<p class="vote_header">Please choose an option.</p>' +
        '<div class="vote_radio_box">' +
        '<p class="vote_radio_bounds">' +
        '<span class="vote_radio_wrapper"><input type="radio" class="vote_select" name="vote_select" id="vote_select_0" value="0" /></span><label for="vote_select_0">View Leasing Information</label>' +
        '</p>' +
        '<p class="vote_radio_bounds">' +
        '<span class="vote_radio_wrapper"><input type="radio" class="vote_select" name="vote_select" id="vote_select_1" value="1" /></span><label for="vote_select_1">View Spaces For Rent</label>' +
        '</p>' +
        '<p class="vote_radio_bounds">' +
        '<span class="vote_radio_wrapper"><input type="radio" class="vote_select" name="vote_select" id="vote_select_2" value="2" /></span><label for="vote_select_2">Apply Online</label>' +
        '</p>' +

        '<a class="movie_vote_continue" href="#"><img title="Continue" alt="Continue" src="' + SITE_URL + 'assets/images/vote_continue.png"></a>' +
        '</div>' +
        '</div>' +
        '</div>';

      $('#container').append($(voteChoice).hide());
      $('#movie_vote_wrapper').width($('#container').width());
      $('#movie_vote_wrapper').height($('#container').height());
      $('#movie_vote_wrapper').fadeIn(600, 'easeInOutExpo');

      // Loader
      var loaderWrapper = '<div id="loader_wrapper">' +
        '<div class="overlay"><!-- --></div>' +
        '<div class="loading">' +
        '<p>Loading your request. Please wait.</p>' +
        '</div>' +
        '</div>';

      var leaseFunctions = {

        destroy: function () {
          // unbind click handlers
          $('.movie_vote_continue, .movie_vote_results_link, #movie_vote_wrapper .overlay').unbind('click');
          $('#movie_vote_wrapper').fadeOut(600, 'easeInOutExpo', function () {
            $(this).remove();
          });
        },

        showLoader: function () {
          if (!$('#loader_wrapper').length) {
            $('#container').append($(loaderWrapper).hide());
            $('#loader_wrapper').width($('#container').width());
            $('#loader_wrapper').height($('#container').height());
            $('#loader_wrapper').fadeIn(600, 'easeInOutExpo');
          }
        },

        // Kill the XHR
        killXHR: function () {
          if (leasingXHR) {
            leasingXHR.abort();
            delete leasingXHR;
            leasingXHR = false;
          }
        },

        getLeaseInfo: function () {
          leaseFunctions.showLoader();
          leaseFunctions.killXHR();

          leasingXHR = $.ajax({
            url: infoUrl,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                $("body, html").addClass("noscroll");

                if (result == 'Error') {
                  alert('An un-identified error occured! We\'ll have this sorted out soon');
                } else {
                  $('.movie_vote_box').addClass('movie_vote_box_expanded');
                  $('.vote_header').empty().html('&nbsp;<a href="#" class="movie_vote_results_link">View Spaces For Rent</a>');
                  $('.movie_vote_results_link').unbind('click');

                  if ($('.vote_radio_box').length) {
                    $('.vote_radio_box').fadeOut(600, 'easeInOutExpo', function () {
                      $(this).remove();
                      $('.movie_vote_box').append($(result).hide());
                      $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                        // attach get results handler
                        $('.movie_vote_results_link').unbind('click').bind('click', function () {
                          leaseFunctions.getListFunction();
                          return false;
                        });

                        // do nice scroll
                        $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                      });
                    });
                  } else {
                    $('.movie_vote_list').fadeOut(600, 'easeInOutExpo', function () {
                      $(this).remove();
                      $('.movie_vote_box').append($(result).hide());
                      $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                        // attach get results handler
                        $('.movie_vote_results_link').unbind('click').bind('click', function () {
                          leaseFunctions.getListFunction();
                          return false;
                        });

                        // do nice scroll
                        $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                      });
                    });
                  }
                }
              });
            }
          });
        },

        // get list function
        getListFunction: function () {
          leaseFunctions.showLoader();
          leaseFunctions.killXHR();

          leaseXHR = $.ajax({
            url: listUrl,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                $("body, html").addClass("noscroll");

                if (result == 'Error') {
                  //alert('An un-identified error occured! We\'ll have this sorted out soon');
                  $('.movie_vote_box').addClass('movie_vote_box_expanded');
                  $('.vote_header').empty().html('&nbsp;<a href="#" class="movie_vote_results_link">Online Application Form</a>');
                  $('.movie_vote_results_link').unbind('click');

                  if ($('.vote_radio_box').length) {
                    $('.vote_radio_box').fadeOut(600, 'easeInOutExpo', function () {
                      $(this).remove();

                      $('.movie_vote_box').append("There are no spaces for rent at this time.");
                      $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                        // handle lightbox
                        $(this).find('.html5lightbox').html5lightbox();
                      });
                    });
                  }
                } else {
                  $('.movie_vote_box').addClass('movie_vote_box_expanded');
                  $('.vote_header').empty().html('&nbsp;<a href="#" class="movie_vote_results_link">Online Application Form</a>');
                  $('.movie_vote_results_link').unbind('click');

                  if ($('.vote_radio_box').length) {
                    $('.vote_radio_box').fadeOut(600, 'easeInOutExpo', function () {
                      $(this).remove();

                      $('.movie_vote_box').append($(result).hide());
                      $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                        // handle lightbox
                        $(this).find('.html5lightbox').html5lightbox();

                        // Handle read more
                        $(this).find('.read_more').unbind('click').bind('click', function () {
                          var timeout = false;
                          // Events flagged with designate_page
                          if ($(this).attr('href') != '#') return true;
                          else {
                            var description = $(this).prev('.description'),
                              details = description.find('.desc_inner'),
                              isOpen = description.data('open');

                            if (!description.data('baseHeight')) description.data('baseHeight', description.height());
                            if (isOpen) {
                              description.css({'height': parseInt(description.data('baseHeight')) + 'px'});
                              $(this).text('Read More');
                            } else {
                              description.css({'height': parseInt(details.outerHeight()) + 'px'});
                              $(this).text('Collapse');
                            }
                            description.data('open', !isOpen);
                            if ($('.movie_vote_list').getNiceScroll().length) {
                              timeout = setTimeout(function () {
                                // do nice scroll
                                $('.movie_vote_list').getNiceScroll().hide();
                                $('.movie_vote_list').getNiceScroll().resize();
                                $('.movie_vote_list').getNiceScroll().show();
                                clearInterval(timeout);
                              }, 600);
                            }
                            return false;
                          }
                        });

                        // attach get form handler
                        $('.movie_vote_results_link, .apply').unbind('click').bind('click', function () {
                          leaseFunctions.getFormFunction();
                          return false;
                        })

                        // do nice scroll
                        $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                      });
                    });
                  } else {
                    $('.movie_vote_list').fadeOut(600, 'easeInOutExpo', function () {
                      $(this).remove();
                      $('.movie_vote_box').append($(result).hide());
                      $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                        // handle lightbox
                        $(this).find('.html5lightbox').html5lightbox();

                        // Handle read more
                        $(this).find('.read_more').unbind('click').bind('click', function () {
                          var timeout = false;
                          // Events flagged with designate_page
                          if ($(this).attr('href') != '#') return true;
                          else {
                            var description = $(this).prev('.description'),
                              details = description.find('.desc_inner'),
                              isOpen = description.data('open');

                            if (!description.data('baseHeight')) description.data('baseHeight', description.height());
                            if (isOpen) {
                              description.css({'height': parseInt(description.data('baseHeight')) + 'px'});
                              $(this).text('Read More');
                            } else {
                              description.css({'height': parseInt(details.outerHeight()) + 'px'});
                              $(this).text('Collapse');
                            }
                            description.data('open', !isOpen);
                            if ($('.movie_vote_list').getNiceScroll().length) {
                              timeout = setTimeout(function () {
                                // do nice scroll
                                $('.movie_vote_list').getNiceScroll().hide();
                                $('.movie_vote_list').getNiceScroll().resize();
                                $('.movie_vote_list').getNiceScroll().show();
                                clearInterval(timeout);
                              }, 600);
                            }
                            return false;
                          }
                        });

                        // attach get form handler
                        $('.movie_vote_results_link, .apply').unbind('click').bind('click', function () {
                          leaseFunctions.getFormFunction();
                          return false;
                        });


                        // do nice scroll
                        $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                      });
                    });
                  }
                }
              });
            }
          });
        },

        // form function
        getFormFunction: function () {
          leaseFunctions.showLoader();
          leaseFunctions.killXHR();

          leaseXHR = $.ajax({
            url: formUrl,
            dataType: 'html',
            error: function () {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                alert('An un-identified error occured! We\'ll have this sorted out soon');
              });
            },
            success: function (result) {
              $('#loader_wrapper').fadeOut(600, 'easeInOutExpo', function () {
                $(this).remove();
                $("body, html").addClass('noscroll');

                $('.movie_vote_box').addClass('movie_vote_box_expanded');
                $('.vote_header').empty().html('&nbsp;<a href="#" class="movie_vote_results_link">View Spaces For Rent</a>');
                $('.movie_vote_results_link').unbind('click');

                if ($('.vote_radio_box').length) {
                  $('.vote_radio_box').fadeOut(600, 'easeInOutExpo', function () {
                    $(this).remove();
                    $('.movie_vote_box').append($($.parseHTML(result)).hide());
                    $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                      // attach get results handler
                      $('.movie_vote_results_link').unbind('click').bind('click', function () {
                        leaseFunctions.getListFunction();
                        return false;
                      });

                      // Add form function
                      $('.ajax_form').validate({
                        debug: true,
                        errorElement: 'span',
                        errorPlacement: function (error, element) {
                          if (element.is('input[type="radio"]') || element.is('input[type="checkbox"]')) {
                            element.parents('.radio_wrap').after(error.hide());
                          } else element.parent().after(error.hide());
                          error.fadeIn(600, 'easeInOutExpo');
                          $('.movie_vote_list').getNiceScroll().resize();
                        },
                        submitHandler: function (form) {

                          form.submit();
                        }
                      });

                      // do nice scroll
                      $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                    });
                  });
                } else {
                  $('.movie_vote_list').fadeOut(600, 'easeInOutExpo', function () {
                    $(this).remove();
                    $('.movie_vote_box').append($($.parseHTML(result)).hide());
                    $('.movie_vote_list').fadeIn(600, 'easeInOutExpo', function () {
                      // attach get results handler
                      $('.movie_vote_results_link').unbind('click').bind('click', function () {
                        leaseFunctions.getListFunction();
                        return false;
                      });

                      // Add form function
                      $('.ajax_form').validate({
                        debug: true,
                        errorElement: 'span',
                        errorPlacement: function (error, element) {
                          if (element.is('input[type="radio"]') || element.is('input[type="checkbox"]')) {
                            element.parents('.radio_wrap').after(error.hide());
                          } else element.parent().after(error.hide());
                          error.fadeIn(600, 'easeInOutExpo');
                          $('.movie_vote_list').getNiceScroll().resize();
                        },
                        submitHandler: function (form) {

                          form.submit();
                        }
                      });

                      // do nice scroll
                      $('.movie_vote_list').niceScroll('.movie_vote_list_scroller', $niceScrollBlueOpts);
                    });
                  });
                }
              });
            }
          });
        }
      };


      // Destroy
      $('.movie_vote_close').unbind('click').bind('click', function () {
        $(this).unbind('click');
        leaseFunctions.destroy();

        $("body, html").removeClass('noscroll');

        return false;
      });

      // Radios - get the selected option and add and remove selected class respectively to give selected look
      $('.vote_select').unbind('change').bind('change', function () {
        $('.vote_select').each(function (index, element) {
          if ($(element).is(':checked')) {
            $(element).parent().addClass('vote_radio_wrapper_selected');
            selectedChoice = index;
          } else $(element).parent().removeClass('vote_radio_wrapper_selected');
        });
        return false;
      });

      $('.vote_radio_wrapper').unbind('click').bind('click', function (e) {
        var radio = $(this).children('.vote_select'),
          index = $('.vote_select').index(radio);

        $('input[name=vote_select]:eq(' + index + ')').prop('checked', true);
        $('input[name=vote_select]:eq(' + index + ')').change();
        return false;
      });

      // Continue Button
      $('.movie_vote_continue').unbind('click').bind('click', function () {
        if (selectedChoice === false) return false;

        switch (selectedChoice) {
          case 0:
            leaseFunctions.getLeaseInfo();
            break;

          case 1:
            leaseFunctions.getListFunction();
            break;

          case 2:
            leaseFunctions.getFormFunction();
            break;
        }

        return false;
      });

      return false;
    });
  }

  var icons = {
    header: "ui-icon-plus",
    activeHeader: "ui-icon-minus"
  };

  $('#accordion, #accordion2, #accordion3').accordion({
    icons: icons,
    heightStyle: "content",
    active: false,
    collapsible: true,
    autoHeight: false,

  });

  /*$('#cinema-faqAccordion').accordion({
    icons: icons,
    heightStyle: "content",
    collapsible: true,
    autoHeight: false,
  });*/

  /*$("#nav-item li a").on("click", function() {
   $("#nav-item").removeClass("active"),
   $("#nav-item", this).addClass("active"),
   });*/


  $("#nav-item li a").on("click", function (e) {
    //e.preventDefault();

    var href = $(this).attr('href');

    $("#nav-item li a").parents("#nav-item").removeClass("btn active"); //Remove any "active" class  ,
    $("#nav-item li a").parents("#nav-item").addClass("btn"); //Remove any "active" class  ,
    $(this).parents('#nav-item').addClass("btn active");

    if (href == "#banquet_suppliers") {
      $('#banquet_suppliers').css('display', 'block');
      $('#banquet_main').css('display', 'none');
      $('#banquet_seating_capacity').css('display', 'none');
      $('#banquet_testimonials').css('display', 'none');
      $('#banquet_contactus').css('display', 'none');
    } else if (href == "#banquet_seating_capacity") {
      $('#banquet_seating_capacity').css('display', 'block');
      $('#banquet_main').css('display', 'none');
      $('#banquet_suppliers').css('display', 'none');
      $('#banquet_testimonials').css('display', 'none');
      $('#banquet_contactus').css('display', 'none');
    } else if (href == "#banquet_testimonials") {
      $('#banquet_testimonials').css('display', 'block');
      $('#banquet_main').css('display', 'none');
      $('#banquet_seating_capacity').css('display', 'none');
      $('#banquet_suppliers').css('display', 'none');
      $('#banquet_contactus').css('display', 'none');
      $("#banquet_testimonials").masonry({
          itemSelector: '.testimonial-div',
          isAnimated: true,
          isFitWidth: true
        });
    } else if (href == "#banquet_contactus") {
      $('#banquet_contactus').css('display', 'block');
      $('#banquet_testimonials').css('display', 'none');
      $('#banquet_main').css('display', 'none');
      $('#banquet_seating_capacity').css('display', 'none');
      $('#banquet_suppliers').css('display', 'none');

      $('#contactus_map').show();
      $('#contactus_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.2443469455128!2d-61.53193296253303!3d10.658862895627701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3608175d1f1b01%3A0x2dab07660c70f674!2sMovieTowne+Mall!5e0!3m2!1sen!2stt!4v1410979895814" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
    } else if (href == "#banquet_main") {
      $('#banquet_main').css('display', 'block');
      $('#banquet_suppliers').css('display', 'none');
      $('#banquet_seating_capacity').css('display', 'none');
      $('#banquet_testimonials').css('display', 'none');
      $('#banquet_contactus').css('display', 'none');
    }
  });

  //google.maps.event.addDomListener(window, 'load', initialize);

  $("#tablink1").click(function () {
    $("#tab1").show();
    $("#content_section").removeClass('content_body_blue_grad').addClass('content_body_vip');
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tab4").hide();
    $("#tab5").hide();
    $("#tab6").hide();
	 $("#tab7").hide();
  });

  $("#tablink2").click(function () {
    $("#tab1").hide();
    $("#tab2").show();
    $("#tab3").hide();
    $("#tab4").hide();
    $("#tab5").hide();
    $("#tab6").hide();
	 $("#tab7").hide();
    $("#content_section").removeClass('content_body_vip').addClass('content_body_blue_grad');
    //$('#tab2').find('.profile_map').css('display', 'block');
    $('#tab2').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.2443469455128!2d-61.53193296253303!3d10.658862895627701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3608175d1f1b01%3A0x2dab07660c70f674!2sMovieTowne+Mall!5e0!3m2!1sen!2stt!4v1410979895814" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');

  });
  $("#tablink3").click(function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").show();
    $("#tab4").hide();
    $("#tab5").hide();
    $("#tab6").hide();
	 $("#tab7").hide();
    $("#content_section").removeClass('content_body_vip').addClass('content_body_blue_grad');

    //$('#tab3').find('.profile_map').css('display', 'block');
    $('#tab3').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3914.347027150053!2d-60.778805000000006!3d11.161920999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c49b27298545be7%3A0xa6c41cb491e860ad!2sMovieTowne+Tobago!5e0!3m2!1sen!2s!4v1423582849053" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');

  });

 $("#tablink7").click(function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tab4").hide();
    $("#tab5").hide();
    $("#tab6").hide();
	$("#tab7").show();
    $("#content_section").removeClass('content_body_vip').addClass('content_body_blue_grad');

    //$('#tab3').find('.profile_map').css('display', 'block');
    $('#tab7').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3914.347027150053!2d-60.778805000000006!3d11.161920999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c49b27298545be7%3A0xa6c41cb491e860ad!2sMovieTowne+Tobago!5e0!3m2!1sen!2s!4v1423582849053" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');

  });

  $("#tablink4").click(function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tab4").show();
    $("#tab5").hide();
    $("#tab6").hide();
	 $("#tab7").hide();
    $("#content_section").removeClass('content_body_vip').addClass('content_body_blue_grad');
    //$('#tab3').find('.profile_map').css('display', 'block');
    //$('#tab4').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3914.347027150053!2d-60.778805000000006!3d11.161920999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c49b27298545be7%3A0xa6c41cb491e860ad!2sMovieTowne+Tobago!5e0!3m2!1sen!2s!4v1423582849053" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');

  });

  $("#tablink5").click(function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tab4").hide();
    $("#tab5").show();
    $("#tab6").hide();
	 $("#tab7").hide();
    $("#content_section").removeClass('content_body_vip').addClass('content_body_blue_grad');
    //$('#tab3').find('.profile_map').css('display', 'block');
    //$('#tab4').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3914.347027150053!2d-60.778805000000006!3d11.161920999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c49b27298545be7%3A0xa6c41cb491e860ad!2sMovieTowne+Tobago!5e0!3m2!1sen!2s!4v1423582849053" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');

  });

  $("#tablink6").click(function () {
    $("#tab1").hide();
    $("#tab2").hide();
    $("#tab3").hide();
    $("#tab4").hide();
    $("#tab5").hide();
    $("#tab6").show();
	 $("#tab7").hide();
    $("#content_section").removeClass('content_body_vip').addClass('content_body_blue_grad');
    //$('#tab3').find('.profile_map').css('display', 'block');
    //$('#tab4').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3914.347027150053!2d-60.778805000000006!3d11.161920999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c49b27298545be7%3A0xa6c41cb491e860ad!2sMovieTowne+Tobago!5e0!3m2!1sen!2s!4v1423582849053" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');

  });

  /* For New Developments */
  $("#guyana-tablink").on("click", function () {

    $("#guyana").hide();
    $("#sando").hide();
    $("#sotw").show();

    $('#guyana').find('.development_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18320.028656037215!2d-58.1086914!3d6.8243415!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDknMjUuMSJOIDU4wrAwNic1MS4zIlc!5e1!3m2!1sen!2stt!4v1432909845460" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
  });

  $("#sando-tablink").on("click", function () {

    $("#guyana").hide();
    $("#sando").show();
    $("#sotw").hide();

    $('#sando').find('.development_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15703.371992293787!2d-61.4376111!3d10.274222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDE2JzI3LjIiTiA2McKwMjYnMTUuNCJX!5e1!3m2!1sen!2stt!4v1432910024051" width="100%" height="100% frameborder="0" style="border:0"></iframe>');
  });

  $("#sotw-tablink").on("click", function () {

    $("#guyana").hide();
    $("#sando").hide();
    $("#sotw").show();

    $('#sotw').find('.development_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15684.055143940403!2d-61.533027800000006!3d10.656027600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDM5JzIxLjciTiA2McKwMzEnNTguOSJX!5e1!3m2!1sen!2stt!4v1432910082662" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
  });


  /* For Contact Us Page */
  $("#tabloc_chag").on("click", function () {
    $("#chag-location").show();
    $("#pos-location").hide();
    $("#tob-location").hide();
    $("#san-location").hide();
    $("#guy-location").hide();
    $('#contact-maphead').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3922.627013463632!2d-61.407813!3d10.530014999999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c35f968a4b45841%3A0x5f1c2667c8103d70!2sMovieTowne!5e0!3m2!1sen!2s!4v1423582911544" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
  });
  $("#tabloc_pos").on("click", function () {
    $("#chag-location").hide();
    $("#pos-location").show();
    $("#tob-location").hide();
    $("#san-location").hide();
    $("#guy-location").hide();
    $('#contact-maphead').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.2443469455128!2d-61.53193296253303!3d10.658862895627701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3608175d1f1b01%3A0x2dab07660c70f674!2sMovieTowne+Mall!5e0!3m2!1sen!2stt!4v1410979895814" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
  });
  $("#tabloc_tob").on("click", function () {
    $("#chag-location").hide();
    $("#pos-location").hide();
    $("#tob-location").show();
    $("#san-location").hide();
    $("#guy-location").hide();
     $('#contact-maphead').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3914.347027150053!2d-60.778805000000006!3d11.161920999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c49b27298545be7%3A0xa6c41cb491e860ad!2sMovieTowne+Tobago!5e0!3m2!1sen!2s!4v1423582849053" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
  });
  $("#tabloc_san").on("click", function () {
    $("#chag-location").hide();
    $("#pos-location").hide();
    $("#tob-location").hide();
    $("#san-location").show();
    $("#guy-location").hide();
     $('#contact-maphead').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.868308050573!2d-61.43964468462372!3d10.272193271105447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c358c60d494cf01%3A0xed9bd06564278da9!2sC3+Centre!5e0!3m2!1sen!2sus!4v1526395553960" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>');
  });
  $("#tabloc_guy").on("click", function () {
    $("#chag-location").hide();
    $("#pos-location").hide();
    $("#tob-location").hide();
    $("#san-location").hide();
    $("#guy-location").show();
    $('#contact-maphead').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.857728904218!2d-58.11344370891233!3d6.821560870975543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dafee9669b4ea39%3A0xa5827f181dcedd5d!2sMovie+Towne!5e0!3m2!1sen!2stt!4v1552927151593" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>');
  });
  if($('#tabloc_pos').length > 0) $('#tabloc_pos').trigger('click');


  /* On load, show VIP Platinum Cinema Tab*/
  var tab = window.location.hash; // if there is a hash in url

  $("#tab2").hide();
  $("#tab1").hide();
  $("#tab3").hide();
  $("#tab4").hide();
  $("#tab5").hide();
  $("#tab6").hide();
  $("#tab7").hide();
  //$('#tab2').find('.profile_map').css('display', 'block');
  $('#tab2').find('.profile_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.2443469455128!2d-61.53193296253303!3d10.658862895627701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3608175d1f1b01%3A0x2dab07660c70f674!2sMovieTowne+Mall!5e0!3m2!1sen!2stt!4v1410979895814" width="100%" height="100%" frameborder="0" style="border:0"></iframe>');
  $('#sando').find('.development_map').html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15703.371992293787!2d-61.4376111!3d10.274222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDE2JzI3LjIiTiA2McKwMjYnMTUuNCJX!5e1!3m2!1sen!2stt!4v1432910024051" width="100%" height="100% frameborder="0" style="border:0"></iframe>');

  var $a = $(".content_links a").on("click", function () {
    $(".content_links a").removeClass("tab selected"); //Remove any "active" class  ,
    $(".content_links a").addClass("tab"); //Remove any "active" class  ,
    $(this).addClass("tab selected");
  });
  // get the tab hash otherwise load first tab
  var $tab = $a.filter(function(){
    return this.hash == tab;
  });

  if($tab.length < 1) $tab = $a.eq(0);

  if(window.location.href.search('page') != -1) $tab.trigger('click');

  jQuery.validator.addMethod("laterThanMidnight", function (value, element) {
    var the_list_array = $("# .super_item:checked");
    return the_list_array.length > 0;
  }, "* Please check at least one check box");


  /* Using hashtags to trigger clicks */

  var newDiv = window.location.hash; /* Getting URL hashtag value */

  /* Banquet Center */
  if (newDiv == "#banquet_suppliers") {
    $('#supplier').trigger('click');
  }
  if (newDiv == "#banquet_testimonials") {
    $('#test').trigger('click');
  }

  if (newDiv == "#banquet_seating_capacity") {
    $('#seating').trigger('click');
  }

  if (newDiv == "#banquet_contactus") {
    $('#contact').trigger('click');
  }

  /* Cinema Profiles */
  if (newDiv == "#profile_info1") {
    $('#tablink1').trigger('click');
  }

  if (newDiv == "#profile_info2") {
    $('#tablink2').trigger('click');
  }

  if (newDiv == "#profile_info3") {
    $('#tablink3').trigger('click');
  }

  if (newDiv == "#profile_info4") {
    $('#tablink4').trigger('click');
  }

  /* New Developments */
  if (newDiv == "#guyana-development") {
    $('#guyana-tablink').trigger('click');
  }

  if (newDiv == "#sando-development") {
    $('#sando-tablink').trigger('click');
  }

  if (newDiv == "#sotw-development") {
    $('#sotw-tablink').trigger('click');
  }

  /* Contact Us */
  if (newDiv == "#chag-location") {
    $('#tabloc_chag').trigger('click');
  }

  if (newDiv == "#pos-location") {
    $('#tabloc_pos').trigger('click');
  }

  if (newDiv == "#tob-location") {
    $('#tabloc_tob').trigger('click');
  }

  /* Making the calendar and categories come in to focus */
  if(newDiv == "#filter"){
   /* $("#filter").attr('tabindex',-1).focus();*/
   /*$(window).scrollTop($(newDiv).offset().top);*/
   $('html, body').scrollTop( $(document).height() - $(window).height() );
  }


  jQuery.validator.addMethod("goodEndTime", function (value, element) {
    //alert("Here");
    var userDate = new Date(Date.parse("02/02/2013 " + $('#e_time_hrs').val() + ":" + $('#e_time_mins').val() + ":00 " + $('#e_time_meridian').val().toUpperCase()));

    var date1 = new Date(Date.parse("02/02/2013 12:00:00 AM"));

    var date2 = new Date(Date.parse("02/02/2013 10:00:00 AM"));

    if (userDate.getTime() > date1.getTime() && userDate.getTime() < date2.getTime()) {
      //alert("Here!");
      return false;
    } else {
      return true;
    }

  }, "End Time cannot be between midnight and 10am");


  /* Contact Us Page Map */




  //Ads Slideshow

  $(function(){
    $('.fadeIn > :gt(0)').hide();
      setInterval(function(){$('.fadeIn > :first-child').fadeOut().next().fadeIn().end().appendTo('.fadeIn');}, 3000);
  });

  /*$('.highlight').children('a.center').each(function (index) {
      this.href =
        $('.highlight').children().children().children('header').children('img')[index].src;
      $(this).html5lightbox();
    });*/

  $('.partner-link1').bind('click', function(e) {

      // Prevents the default action to be triggered.
      e.preventDefault();

      // Triggering bPopup when click event is fired
      $('#partners-dialog1').bPopup({
        modal: false,
      });

  });

  $('.partner-link2').bind('click', function(e) {

      // Prevents the default action to be triggered.
      e.preventDefault();

      // Triggering bPopup when click event is fired
      $('#partners-dialog2').bPopup({
        modal: false,
      });

  });

  $('.partner-link3').bind('click', function(e) {

      // Prevents the default action to be triggered.
      e.preventDefault();

      // Triggering bPopup when click event is fired
      $('#partners-dialog3').bPopup({
        modal: false,
      });

  });

  $('.partner-link4').bind('click', function(e) {

    // Prevents the default action to be triggered.
    e.preventDefault();

    // Triggering bPopup when click event is fired
    $('#partners-dialog4').bPopup({
      modal: false,
  });


  });
  $('.partner-link5').bind('click', function(e) {

      // Prevents the default action to be triggered.
      e.preventDefault();

      // Triggering bPopup when click event is fired
      $('#partners-dialog5').bPopup({
        modal: false,
      });

  });

  $('.partner-link6').bind('click', function(e) {

      // Prevents the default action to be triggered.
      e.preventDefault();

      // Triggering bPopup when click event is fired
      $('#partners-dialog6').bPopup({
        modal: false,
      });

  });

  $(".appBtn").click(function(){
    $(".career-popup").bPopup().close();
  });

  $(".p-close-btn").click(function(){
    $(".p-dialog").bPopup().close();
  });


  // Enable Subscribe form popup
  if (!$.cookie("initialLoad")){
    // do your stuff
    var current_page_title = $(document).attr('title');

    if(current_page_title == 'Home | Movie Towne'){
      $('#side_subscribe_btn').trigger('click');
    }

     // set cookie now
     $.cookie("initialLoad", "true", {"expires" : 1})
  }


});

function receiveEmailChange(){
  if($('#receive_emails').prop('checked')){
    $('#checkboxes').show();
  }else{
    $('#checkboxes').hide();
  }
}


function doPopup(className){

  // Triggering bPopup when click event is fired
  $('#dialog-'+ className +'').bPopup({
    modal: false,
  });

}


function doEventPopup(idName){

  // Triggering bPopup when click event is fired
  $('#dialog-'+ idName +'').bPopup({
    modal: true,
  });

  $(".scroll_wrapper_event").jScrollPane({
    autoReinitialise: true
  });
}

function doSideEventPopup(idName){

  // Triggering bPopup when click event is fired
  $('#dialog-'+ idName +'').bPopup({
    modal: true,
  });

  $(".scroll_wrapper_event").jScrollPane({
    autoReinitialise: true
  });
}


function checkAll() {
  if ($('#member_all_above').prop('checked')) {
        $('input:checkbox[id=member_list]').prop('checked', true);
    } else {
        $('input:checkbox[id=member_list]').prop('checked', false);
    }

}

function toSando(){
   $("#guyana").hide();
    $("#sando").show();
    $("#sotw").hide();
}

function toGuyana(){
   $("#guyana").show();
    $("#sando").hide();
    $("#sotw").hide();
}

function toSotw(){
  $("#guyana").hide();
    $("#sando").hide();
    $("#sotw").show();
}
