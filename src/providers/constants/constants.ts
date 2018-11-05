import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantsProvider {

  //Common API Constants
  public static API_BASE_URL: string = "http://132.148.151.28:8080/komal/";
  public static API_ENDPOINT_ACTIVATE_DEACTIVATE = "activate-deactivate";
  public static API_ENDPOINT_USERS = "users";
  public static URL_SEPARATOR = "/";
  public static URL_PARAM_PAGE_NO = "page-no=";
  public static API_ENDPOINT_OAUTH = "oauth/token";

  //API Endpoints
  public static API_ENDPOINT_HOMESCREEN = 'categoryandsubcategoryalldetails';
  public static API_ENDPOINT_LOGIN = "login";
  public static API_ENDPOINT_REGISTRATION = "userdetails";
  public static API_ENDPOINT_SEND_OTP = "sendotp";
  public static API_ENDPOINT_VERIFY_OTP = "verifyotp";
  public static API_ENDPOINT_ORDER_LIST = "cartdetails";


  //Master Data JSON key names
  public static API_ENDPOINT_MASTER_DATA = "ext/master";
  public static MD_CITY = "cityDtlsList";
  public static MD_STATE = "stateDtlsList";
  public static MD_AREA = "areaDtlsList";
  public static MD_COUNTRY = "countryDtlsList";
  public static MD_ROADSIDE = "roadside";
  public static MD_WORKCATEGORY = "workcategory";
  public static MD_WIDTH = "width";
  public static MD_FACING = "facing";
  public static MD_HOARDING_TYPE = "hoardingtype";
  public static MD_LIGHT_TYPE = "lighttype";
  public static MD_VISIBILITY_TYPE = "visibilitytype";
  public static MD_HEIGHT = "height";

  public static IS_SUCCESS = 1;
  public static IS_ERROR = 1;

  public static pageNum = 1;

  public static PUSH_SERVICE_URL = "http://push.api.phonegap.com/v1/push";

  constructor(public http: HttpClient) {
    console.log('Hello ConstantsProvider Provider');
  }

}
