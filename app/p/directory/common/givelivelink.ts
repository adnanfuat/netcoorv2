

export const givelivelink =  ({     project, livelink, country_slug, city_slug, district_slug, subdistrict_slug     }) => { 

        
                if (project=="yurtarama.com") 
                {        
                        // İkisi de aynı kod..
                        if (subdistrict_slug){
                                livelink=livelink+"/"+city_slug+"/"+district_slug+"/"+subdistrict_slug
                           }
                        else if (district_slug){
                                livelink=livelink+"/"+city_slug+"/"+district_slug
                           }     
                           else if (city_slug){
                                                livelink=livelink+"/"+city_slug
                                              }          
        
                }
                else if (project=="sakaryarehberim.com") 
                {                                              
                        // İkisi de aynı kod..
                        if (subdistrict_slug){
                                livelink=livelink+"/"+district_slug+"/"+subdistrict_slug; // default olarak hep sakaryayı kabul ediyoruz zaten...
                           }
                        else if (district_slug){
                                livelink=livelink+"/"+district_slug;
                           }     
                           else if (city_slug){
                                                livelink=livelink; // +"/"+city_slug --> Her zaman Sakarya
                                              }  
                                                      
                }
          
                    
                return livelink;
          
          }