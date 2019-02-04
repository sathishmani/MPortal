var domain = "https://server.beautifulmatrimony.com/";
// var domain = "http://192.168.1.6:8000/";

//index page api 
var indexpage_dd_api = domain + 'user/list/drop-down/sign-up/';
var usersignup_api = domain + 'auth/registration/';
var usersignupfacebook_api = domain + 'auth/facebook/login/';
var usersignupgoogle_api = domain + 'auth/google/login/';
var sendnewsletter_api = domain + 'user/send/app-link/';

//login page api
var login_api = domain + 'auth/login/';
var login_api_fb = domain + 'auth/facebook/login/';
var login_api_google = domain + 'auth/google/login/';

//frgtpassword page api 
var forgotpwd_api = domain + 'auth/forgot-password/';

//activation page api 
var accountactivation_api = domain + 'auth/activate-account/';

//reset password page api
var resetpassword_api = domain + 'auth/reset-password/';

//logout api
var logout_api = domain + 'auth/logout/';

//change password api 
var changepassword_api = domain + 'auth/change-password/';

//skip fn starts here
var skipregisteration_api = domain + 'user/skip-registration/';

//register page check api starts here
var registerpagecheck_api = domain + 'user/list/skip-status/';

//register phase 1 api 
var getregp1data_api = domain + 'user/list/drop-down/register-phase-1/';
var getregp1statesdata_api = domain + 'user/list/states/';
var getregp1citiesdata_api = domain + 'user/list/cities/';
var getregp1subcastedata_api = domain + 'user/list/sub-caste/';
var sendrp1data_api = domain + 'auth/register/phase-1/';

//register phase 2 api starts here
var sendotptouser_api = domain + 'auth/send-verification-code/';
var otpverification_api = domain + 'auth/verify/mobile-number/';
var editmobileno_api = domain + 'auth/update/mobile-number/';


var editpahse2_master_data_api = domain + 'user/list/edit-phase2/';

//register phase 3 api starts here
var sendrp3data_api = domain + 'auth/create/user-photos/';

//register phase 4 page api
var getregp4data_api = domain + 'user/list/drop-down/register-phase-4/';
var sendrp4data_api = domain + 'auth/create/hobbies/interests/';

//register phase 5 api
var getregp5data_api = domain + 'user/list/drop-down/register-phase-5/';
var getregp5raasidata_api = domain + 'user/list/raasi/';
var sendrp5data_api = domain + 'auth/create/user-basic-information/';

//register phase 6 api
var getregp6data_api = domain + 'user/list/drop-down/register-phase-6/';
var sendrp6data_api = domain + 'auth/create/partner-preferences/';

//contact us api 
var contactus_api = domain + 'user/contact-us/';

//myprofile page api 
var myprofile_api = domain + 'user/list/my-profile/';

//profile page api
var profile_api = domain + 'user/list/my-profile/';

//edit phase 1 api
var editprofilep1_dd_api = domain + 'user/list/drop-down/sign-up/'; //getting only profile for dd
var sendeditp1data_api = domain + 'user/edit/my-profile/phase-1/';
var deleteprofpic_api = domain + 'user/delete/user-photos/';
var updatemobileno_ep1_api = domain + 'user/send-verification-otp/';
var otpverification_ep1_api = domain + 'user/update/mobile-number/';
var uploadUserPhoto_api = domain + "user/upload-photo/"

//edit phase 2 api
var sendeditp2data_api = domain + 'user/edit/my-profile/phase-2/';

//edit phase 3 api
var sendeditp3data_api = domain + 'user/edit/my-profile/phase-3/';
var editprofilep3_dd_api = domain + 'user/list/drop-down/register-phase-1/';

//editprofile phase4_api
var editprofilep4_dd_api = domain + 'user/list/drop-down/register-phase-4/';
var sendeditp4data_api = domain + 'user/edit/my-profile/phase-4/';

//editprofile phase5_api
var editprofilep5_dd_api = domain + 'user/list/drop-down/register-phase-5/';
var sendeditp5data_api = domain + 'user/edit/my-profile/phase-5/';

//edit phase 6 api 
var editprofilep6_dd_api = domain + 'user/list/my-profile/phase-6/';
var geteditphase6subcastedata_api = domain + 'user/list/sub-caste/';
var geteditphase6raasidata_api = domain + 'user/list/raasi/';
var sendeditp6data_api = domain + 'user/edit/my-profile/phase-6/';

//edit phase 7 api
var sendeditp7data_api = domain + 'user/edit/my-profile/phase-7/';
var editprofilep7_dd_api = domain + 'user/list/drop-down/register-phase-6/';

//edit phase 8 api
var editprofilep8_dd_api = domain + 'user/list/drop-down/register-phase-1/';
var geteditphase8statesdata_api = domain + 'user/list/states/';
var geteditphase8citiesdata_api = domain + 'user/list/cities/';
var sendeditp8data_api = domain + 'user/edit/my-profile/phase-8/';

//index page recently joined api
var recentlyjoined_api = domain + 'user/list/recently-joined/';

//dashboard page api
var preferedlocationdashbrd_api = domain + 'user/list/preferred-location/'; //prefered location api
var latestupdatedashbrd_api = domain + 'user/list/latest-updates/'; //lates update api
var newmatchesdashbrd_api = domain + 'user/list/new-matches/'; //new matches api
var intprofileindashboard_api = domain + 'user/list/interested-profiles/'; //interested profile

var sendnewrequest_newmatches_api = domain + 'user/shortlist-profile/'; //accept new matches
var denynewrequest_newmatches_api = domain + 'user/ignore-profile/'; //deny new matches
var sendnewrequest_intrestedprof_api = domain + 'user/shortlist-profile/'; //accept interested profile
var denynewrequest_intrestedprof_api = domain + 'user/ignore-profile/';  //deny interested profile

//send request , deny request , likes profile
var doshortlist_api = domain + 'user/shortlist-profile/';
var doignore_api = domain + 'user/ignore-profile/';
var dolikes_api = domain + 'user/like-profiles/';

var userprofiledashboard_api = domain + 'user/list/profile-completeness/'; //profile completeness

//search by keyword page api
var searchkeyword_api = domain + 'user/retrieve/keywords/';
var keywordssearch_api = domain + 'user/keyword-search/?search=';

//search by id page api
var idssearch_api = domain + 'user/search-by-id?uid=';

//recently viewed profile
var recentlyviewdprofile_api = domain + 'user/recently-viewed-profiles/';
var viewdprofile_api = domain + 'user/view-profile/';

//regular search page api
var regularsearch_dd_api = domain + 'user/list/search-drop-down/';
var searchmaincntnt_api = domain + 'user/soulmate-search/';
var searchsidecntnt_api = domain + 'user/filter-results/';


// search keyword api
var filteredsearch_api = domain + 'user/list/filtered-results/';

//profile page view mobile no
var viewmobileno_api = domain + 'user/view/mobile-number/';

//user online check fn starts here
var checkonlineusers = domain + 'user/create/user-last-seen/';


//17/11 -v myprofile page
var deactivateaccount_api = domain + 'user/deactivate-account/';

//18/11 -v profile page
var requestphonenumber_api = domain + 'user/request/mobile-number/';
var requestphoto_api = domain + 'user/request/photo/';

//18/11 -v requests page api 
var requestspage_api = domain + 'user/list/user-requests/?type=';
var acceptusernumberrequest_api = domain + 'user/update/mobile-number/request/';
var acceptuserphotorequest_api = domain + 'user/update/photo/request/';

//18/11 -v upgrade page
var listPackages_api = domain + 'user/list/packages/';
var payment_api = domain + 'user/payment-gateway/';
var paymentsuccess_api = domain + 'user/payment-success/'; 

var getpoints_api = domain + 'user/user/points/';

var quicksearch_api = domain + 'user/home/search/';

var is_premium_api = domain + 'user/is-premium/';
var onlinemember_api = domain + 'user/online-member/';
var onlinechat_api = domain + 'user/online-chat/';
var vs_notification_api = domain + "user/notification/";
var list_language_api = domain + "user/list/language/";

// var quicksearch_fitler_api = domain + 'user/home/filter/';
