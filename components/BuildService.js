/*@flow*/

const U_KEY = '8f9d205b1aaee0ff18353cc091c4908d';
const API_KEY = 'ca1cbd6c6323f55e3d2364287dcd49e6';
const API_PATH = 'http://www.pgyer.com/apiv1/user/listMyPublished';

const Realm = require('realm');


const BuildSchema = {
  name: 'Build',
  primaryKey: 'appKey',
  properties: {
    appKey: 'string',
    appType: 'string',
    appFileSize: 'string',
    appName: 'string',
    appVersion: 'string',
    appVersionNo: 'string',
    appBuildVersion: 'string',
    appIdentifier: 'string',
    appIcon: 'string',
    appDescription: 'string',
    appUpdateDescription: 'string',
    appScreenshots: 'string',
    appCreated: 'string'
  }
};


let realm = new Realm({schema: [BuildSchema]});

class BuildService {
  // apiPath(): string {
  //   return API_PATH;
  // }
 loadBuildList(url){
    // return new Promise((resolve,reject) => {

      var data = new FormData();
      data.append('uKey', U_KEY);
      data.append('_api_key',API_KEY);
      console.log(data);
      return fetch(url, {
        method: 'post',
        body:data
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          realm.write(() => {

            // if (page === 1) {
            //   let builds = realm.objects('Build');
            //   realm.delete(builds);
            // }
            for (let i = 0;i < responseData.data.list.length; i++) {
              // 里面的子内容是通过递归创建的
              realm.create('Build',responseData.data.list[i]);
            }
            // if (responseData.data.list.length == 20) {
            //   resolve(false)
            //   // this.loadBuildList(url,page + 1);
            // } else {
            //   resolve(true);
            // }
          })
        })
        .done();
    }
    // )
    // .then((value)=> {
    //   if (!value) {
    //     return this.loadBuildList(url, page + 1)
    //   }
    //   return true;
    // })
  // }
}
// const SingleBDService = new BuildService();
module.exports = BuildService;