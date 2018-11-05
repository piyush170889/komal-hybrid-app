
class HomescreenDetails{
    categoryDetails:CategoryDetails =new CategoryDetails();
    subCategoryDetails:Array<SubCategoryDetails> = [];

}

class CategoryDetails{
    id:number;
    name:string;
}

class SubCategoryDetails{
    id:number;
    name:string;
    url:string;
    catDesc:string;
    parantId:number;
}