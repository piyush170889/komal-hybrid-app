import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';
import { ConstantsProvider } from "../constants/constants";
import { Observable } from 'rxjs/Rx';


export class AreaDtl {
    areaDtlsId: number;
    areaNm: string;
    cityDtlsId: number;
    areaDesc: string;
    areaCode: string;
    areaPincode: string;
}

export class CityDtl {
    cityDtlsId: number;
    stateDtlsId: number;
    cityNm: string;
    cityDesc: String;
}

export class StateDtl {
    stateDtlsId: number;
    countryDtlsId: number;
    stateNm: string;
    stateCode: string;
    stateDesc: String;
}

@Injectable()
export class CommonUtilityProvider {

    loading: Loading;

    constructor(
        public network: Network,
        private alertCtrl: AlertController,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private http: HttpClient
    ) {
        console.log('Hello CommonUtilityProvider Provider');
    }

    isNetworkAvailableFlag: boolean = true;

    isNetworkAvailable() {

        if (!this.isNetworkAvailableFlag) {
            let alert = this.alertCtrl.create({
                subTitle: 'No Internet Connection',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.isNetworkAvailable();
                        }
                    }
                ]
            });
            alert.present();
        }

        return this.isNetworkAvailableFlag;
    }


    //    isNetworkAvailable() {
    //     if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined) {
    //       let alert = this.alertCtrl.create({
    //           subTitle: 'No Internet Connection',
    //           enableBackdropDismiss: false ,
    //           buttons: [
    //                   {
    //                       text: 'OK',
    //                       handler: () => {
    //                           this.isNetworkAvailable();
    //                       }
    //                   }
    //               ]
    //           });
    //           alert.present();
    //           return false;
    //       } else {
    //           return true;
    //       }  

    //   }


    createLoader(message: string = "Please wait...") { // Optional Parameter
        return this.loadingCtrl.create({
            content: message
        });
    }

    presentToast(messageContent, messageDuration) {

        const toast = this.toastCtrl.create({
            message: messageContent,
            duration: messageDuration
        });

        toast.present();
    }

    getAreaByAreaDtlsId(areaId) {
        let areaDtlsList: any = this.getMasterDataListByGroupName(ConstantsProvider.MD_AREA);
        let areaDtl: AreaDtl = new AreaDtl();
        areaDtlsList.forEach(element => {
            if (element.areaDtlsId == areaId) {
                areaDtl = element;
            }
        });

        return areaDtl;
    }

    getAreaNameByAreaDtlsId(areaId) {
        let areaDtl: AreaDtl = this.getAreaByAreaDtlsId(areaId);
        return areaDtl.areaNm;
    }

    getStateDtlByStateId(stateId) {

        let stateDtlsList: any = this.getMasterDataListByGroupName(ConstantsProvider.MD_STATE);
        let stateDtl: StateDtl = new StateDtl();
        stateDtlsList.forEach(element => {
            if (element.stateDtlsId == stateId) {
                stateDtl = element;
            }
        });

        return stateDtl;
    }

    getStateNameDtlByStateId(stateId) {
        let stateDtl: StateDtl = this.getStateDtlByStateId(stateId);
        return stateDtl.stateNm;
    }

    getStateNameByCityId(cityId) {
        let cityDtl: CityDtl = this.getCityDtlByCityId(cityId)
        return this.getStateNameDtlByStateId(cityDtl.stateDtlsId);
    }

    getStateDtlByCityId(cityId) {
        let cityDtl: CityDtl = this.getCityDtlByCityId(cityId)
        return this.getStateDtlByStateId(cityDtl.stateDtlsId);
    }

    getCityDtlByCityId(cityId) {

        let cityDtlsList: any = this.getMasterDataListByGroupName(ConstantsProvider.MD_CITY);
        let cityDtl: CityDtl = new CityDtl();
        cityDtlsList.forEach(element => {
            if (element.cityDtlsId == cityId) {
                cityDtl = element;
            }
        });

        return cityDtl;
    }

    getCityNameDtlByCityId(cityId) {
        let cityDtl: CityDtl = this.getCityDtlByCityId(cityId);
        return cityDtl.cityNm;
    }

    getCityNameByAreaId(areaId) {
        let areaDtl: AreaDtl = this.getAreaByAreaDtlsId(areaId);
        return this.getCityNameDtlByCityId(areaDtl.cityDtlsId)
    }

    getCityDtlByAreaId(areaId) {
        let areaDtl: AreaDtl = this.getAreaByAreaDtlsId(areaId);
        return this.getCityDtlByCityId(areaDtl.cityDtlsId)
    }

    presentErrorToast(error: any) {
        const toast = this.toastCtrl.create({
            message: error,
            duration: 3000
        });

        toast.present();
    }


    createBasicAuthHeaderOptions() {

        let headers = new HttpHeaders({
            "Authorization": "Basic ZmxlZXQ6ZmxlZXQtc2VjcmV0"
        });

        console.log("Login Header Options - " + JSON.stringify(headers.get("Authorization")));
        return headers;
    }

    public clearStorage() {
        localStorage.clear();
    }

    public setTokenInStorage(data: any) {
        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    }

    public updateMasterData() {
        let isMasterDataUpdated = localStorage.getItem('isMasterDataUpdated') == null ? '0' : localStorage.getItem('isMasterDataUpdated');
        console.log('isMasterDataUpdated = ' + isMasterDataUpdated);
        if (isMasterDataUpdated != '1') {
            if (this.isNetworkAvailable()) {
                this.loading = this.createLoader();
                this.loading.present();
                this.makeMAsterDatApiCall()
                    .subscribe(
                        (response) => {
                            this.loading.dismiss();
                            let data: any = response;
                            console.log('Master Data :- ' + JSON.stringify(data.data));
                            alert('Master Data :- ' + JSON.stringify(data.data));
                            this.setMasterDataInLocalStorage(data.data, '1');
                        },
                        (err) => {
                            this.loading.dismiss();
                            console.log("Error - " + JSON.stringify(err));
                            this.presentErrorToast(err);
                        }
                    );
            }
        }
    }

    private makeMAsterDatApiCall() {
        let masterDataUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_MASTER_DATA;
        return this.http.get(masterDataUrl)
            .map(response => response)
            .catch((err: Response) => {
                return Observable.throw(err);
            });
    }

    public getMasterDataListByGroupName(groupName: string) {

        let masterDataString: any = localStorage.getItem('masterdata');
        if (masterDataString == null) {
            return this.refreshMasterData(groupName);
        } else {
            let masterData: any = JSON.parse(masterDataString);
            let searchItemList: any = masterData[groupName];
            if (searchItemList == null || searchItemList == undefined) {
                localStorage.setItem('isMasterDataUpdated', '0');
                return this.refreshMasterData(groupName);
            } else {
                console.log('Search Item List = ' + JSON.stringify(searchItemList));
                return searchItemList;
            }
        }

    }

    private refreshMasterData(groupName: string) {
        return this.makeMAsterDatApiCall()
            .subscribe(
                (response) => {
                    let data: any = response;
                    console.log('Master Data :- ' + JSON.stringify(data.response));
                    this.setMasterDataInLocalStorage(data.response, '1');
                    console.log('Reached Here - 11');
                    return this.getMasterDataListByGroupName(groupName);
                }
            );
    }

    public setMasterDataInLocalStorage(masterData: any, isMasterDataUpdated: string) {
        localStorage.setItem('masterdata', JSON.stringify(masterData));
        localStorage.setItem('isMasterDataUpdated', isMasterDataUpdated);
    }

    public getDisplayTextByGroupNameAndId(groupName, id) {
        console.log('Group Name = ' + groupName + ', ID = ' + id);
        let searchItemList: any = this.getMasterDataListByGroupName(groupName);

        let displayText: string;
        searchItemList.forEach(element => {
            if (element.masterDataId == id) {
                displayText = element.displayText;
            }
        });
        return displayText;
    }

    public getCityListByStateId(stateId) {
        let cityDtlsList: CityDtl[] = this.getMasterDataListByGroupName(ConstantsProvider.MD_CITY);
        let cityListByStateId: CityDtl[] = [];
        cityDtlsList.forEach(element => {
            if (element.stateDtlsId == stateId) {
                cityListByStateId.push(element);
            }
        });

        return cityListByStateId;
    }

    public getAreaListByCityId(cityId) {
        console.log('City ID to compare = ' + cityId);
        let areaDtlsList: AreaDtl[] = this.getMasterDataListByGroupName(ConstantsProvider.MD_AREA);
        let areaListByCityId: AreaDtl[] = [];
        areaDtlsList.forEach(element => {
            if (element.cityDtlsId == cityId) {
                areaListByCityId.push(element);
            }
        });

        return areaListByCityId;
    }

    getCartItemSize() {

        let cartDetails = this.getCartDetails();
        let cartDetailsKeys: string[] = Object.keys(cartDetails);
        let cartItemSize = Number.parseInt("0");

        cartDetailsKeys.forEach(
            (key) => {
                let itemList: any = [];
                itemList = cartDetails[key];
                if (null != itemList && itemList.length > 0) {
                    itemList.forEach(
                        (item) => {
                            cartItemSize = cartItemSize + Number.parseInt(item.selectedQty.toString());
                            console.log('cartItemSize = ' + cartItemSize);
                        }
                    );
                }
            }
        );

        return cartItemSize;
    }

    getCartDetails() {
        let cartDetailsString: any = localStorage.getItem(ConstantsProvider.LOCAL_STRG_CART_DETAILS);
        let cartDetails: any = {};

        if (null != cartDetailsString && cartDetailsString != undefined
            && cartDetailsString != '' && cartDetailsString != 'undefined') {
            console.log('Parsing CartDetails')
            cartDetails = JSON.parse(cartDetailsString);
        }

        return cartDetails;
    }

    setCartDetails(cartDetails: any) {
        localStorage.setItem(ConstantsProvider.LOCAL_STRG_CART_DETAILS, JSON.stringify(cartDetails));
    }

    getUserDetailsId(): string {

        return localStorage.getItem(ConstantsProvider.LOCAL_STRG_USR_DTLS_ID);
    }

    getUserDetails(): string {

        return localStorage.getItem(ConstantsProvider.LOCAL_STRG_USR_DTLS);
    }

}
