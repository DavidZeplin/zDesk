/**
 * There are 3 types of Alerts
 * 
 * homealert - will be displayed on all pages
 * categoryalert page - will be displayed on category/section pages
 * sectionalert - will only be displayed on the section page
 * 
 * Template pages you wish to have alerts function on require an attribute appended to the body. If they do not have that, this code will use the default
 * option in the switch statement that will only pull the homepage alerts.
 * 
 * Example: Search Results pages do not get an ATTR, so they will only display homepage alerts
 * 
 * ie:  $('body').attr("page", "homepage");
 * ie:  $('body').attr("page", "category");
 * ie:  $('body').attr("page", "section");
 * ie:  $('body').attr("page", "article");
 */

if(typeof redAlerts === 'undefined') {
    window.redAlerts = '';
}
if(typeof redAlertCategory === 'undefined') {
    window.redAlertCategory = '';
}
if(typeof redAlertSection === 'undefined') {
    window.redAlertSection = '';
}

window.redAlerts = '';
window.redAlertSection = '';
window.redAlertCategory = '';

$(function(){
    
    //determine the page type
    var pageType = getPageType();
    
    switch(pageType) {
        case 'homepage':
            $.when(getHomeAlerts()).done(displayAlerts);
        break;

        case 'category':
            redAlertCategory = getPageInfo('categories').id;
            $.when(getHomeAlerts(), getCategoryAlerts()).done(displayAlerts);
        break;

        case 'section':
            redAlertSection = getPageInfo('sections').id;
            getParametersFromBreadcrumbs();
            $.when(getHomeAlerts(), getCategoryAlerts(), getSectionAlerts()).done(displayAlerts);
        break;

        case 'article':
            getParametersFromBreadcrumbs();
            $.when(getHomeAlerts(), getCategoryAlerts(), getSectionAlerts()).done(displayAlerts);
        break;

        default:
             $.when(getHomeAlerts()).done(displayAlerts);
        break;
        
    }

    $('.alert-container .close').on('keypress', function(event){
        var keyCode = (event.keyCode ? event.keyCode : event.which);
        if (keyCode == 13) {
        ////console.log('enter');
            removeAlert(this);
        }
    });

});//end function() Ready

/**
 * Handles fetching homepage tagged articles
 * 
 */
function getHomeAlerts() {
    ////console.log('getting home alerts');
    redAlertUrl =  '/api/v2/help_center/'+lang+'/articles.json?label_names=homealert';
    
    return $.getJSON(redAlertUrl, function(data) {

        ////console.log('red alert data' + data);

        $.each(data.articles.slice(0,1), function(key, val) {
            if(Cookies.get('hide_alert_'+val.id+'') == undefined){
                var displayText = val.body;
                redAlerts +=
                    '<li role="alert" class="red-alert-item" alertId="'+val.id+'">' +
                        '<div class="alert-container">' +
                            '<div class="text-container">' +

                                '<h2 class="red-alert-title">' + val.title + '</h2>' +
                                    '<span class="red-alert-body">' + displayText + '</span>' +
                            '</div>' +
                            '<a tabindex="0" onclick="removeAlert(this);" aria-label="Close alert message" class="close"></a>' +
                        '</div>' +
                    '</li>';
            }
        });
    });
}

/**
 * Handles fetching all category the articles
 * 
 */
function getCategoryAlerts() {
   ////console.log('getting category alerts');

   redAlertUrl = '/api/v2/help_center/'+lang+'/categories/'+redAlertCategory+'/articles.json?label_names=categoryalert'


   return $.getJSON(redAlertUrl, function(data) {

        ////console.log('red alert data' + data);
        
        $.each(data.articles.slice(0,1), function(key, val) {
            ////console.log('article title '  + val.title);
            if(Cookies.get('hide_alert_'+val.id+'') == undefined){
                var displayText = val.body;
                redAlerts +=
                    '<li role="alert" class="red-alert-item" alertId="'+val.id+'">' +
                        '<div class="alert-container">' +
                            '<div class="text-container">' +

                                '<h2 class="red-alert-title">' + val.title + '</h2>' +
                                '<span class="red-alert-body">' + displayText + '</span>' +
                            '</div>' +
                            '<a tabindex="0" onclick="removeAlert(this);" aria-label="Close alert message" class="close"></a>' +
                        '</div>' +
                    '</li>';
            }
          });
    });
}

/**
 * Handles fetching section Articles
 *
 */
function getSectionAlerts() {
    ////console.log('getting section alerts');
    redAlertUrl = '/api/v2/help_center/'+lang+'/sections/'+redAlertSection+'/articles.json?label_names=sectionalert'

    return $.getJSON(redAlertUrl, function(data) {
        
        ////console.log('red alert data' + data);
        
        $.each(data.articles.slice(0,1), function(key, val) {
            if(Cookies.get('hide_alert_'+val.id+'') == undefined){
                var displayText = val.body;
                redAlerts +=
                    '<li role="alert" class="red-alert-item" alertId="'+val.id+'">' +
                        '<div class="alert-container">' +
                            '<div class="text-container">' +

                                '<h2 class="red-alert-title">' + val.title + '</h2>' +
                                    '<span class="red-alert-body">' + displayText + '</span>' +
                            '</div>' +
                            '<a tabindex="0" onclick="removeAlert(this);" aria-label="Close alert message" class="close"></a>' +
                        '</div>' +
                    '</li>';
            }
        });
    });
}

/**
 * displays any alerts we've generated
 */
function displayAlerts(){
    $('.red-alerts-container').append( redAlerts );
    $('.red-alerts-container').show();
}

/**
 * Returns the type of page we've loaded
 */
function getPageType(){
    return $('body').attr('page');
}

/**
 * Removes the selected Alert from the DOM
 * @param {} elem 
 */
function removeAlert(elem){
    $(elem).parent().parent().hide();
    // var redalert = $(elem).parent().attr("class");
    ////console.log(redalert);
    var alertId = $(elem).parent().parent().attr('alertid');

    var date = new Date();
    date.setTime(date.getTime() + (1800 * 1000));

    ////console.log('category id: ' + categoryId);
    Cookies.set('hide_alert_'+alertId+'', alertId, {expires: date});
}

/**
 * because of Zendesks major issue with sharing active category / active section
 * we have to parse this out with each run of this JS file
 **/
function getParametersFromBreadcrumbs(){
    $('.breadcrumbs.desktop li a').each(function(index, val){
        var tmpCategory;
        if(index == 1){
            tmpCategory = $(val).attr("href").split('/');
            tmpCategory = tmpCategory[4].split('-');
            redAlertCategory = tmpCategory[0];
        }
        else if(index == 2){
            tmpCategory = $(val).attr("href").split('/');
            tmpCategory = tmpCategory[4].split('-');
            redAlertSection = tmpCategory[0];
        }
    });
}