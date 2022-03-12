import useCollapse from 'react-collapsed';
import barbro from './icons/barbro.png';
import bitza from './icons/bitza.png';
import chelas from './icons/chelas.png';
import warung from './icons/warung.png';
import tjoget from './icons/tjoget.png';


export default function CollapsibleHornstull() {
	
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
		duration:10
	});

return (
    <div className="Hornstull-container">
        <div className="header" {...getToggleProps()}>
            {isExpanded ? '' : 'Expand'}
		        <div {...getCollapseProps()}>
            <div className="content">
				<h1 style={{ padding: "2vh 5vw", textAlign: "center"}}> Hornstull Restauranger </h1>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Restaurang Barbro </h2>
				<img src={barbro} alt="barbro" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				Sedan öppningen 2011 har Barbro i Hornstull varit en av söders mest populära restauranger. 
				Barbro är en asiatisk pärla som serverar mellanrätter som beställs till bordet och delas på. 
				På menyn finns bland annat favoriterna spicy tuna, biff sashimi och varianter på tartar och dumplings.
				<br/><br/>Boka bord
				<a style={{ color: "hotpink"}} href='https://bar-bro.se/' target="_blank" title="Opens in a new window"> här</a>
				</p>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Bitza </h2>
				<img src={bitza} alt="bitza" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				Arabiska pizzor, folköl och kaffe. Det hittar du på Bitza, som ligger i Hornstull och drivs av Aadel Kersh från Kersh Kafferosteri. 
				Här serveras pizzor som görs med napolitansk deg, men med smaker från bland annat Palestina och Libanon. Kaffet kommer självklart från ägarens eget rosteri.
				</p>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Chelas </h2>
				<img src={chelas} alt="chelas" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				På Chelas i Hornstull är det äkta mexikansk mat som gäller. Här serveras middag fram till sent på kvällen och i baren kan man även hitta tequila och andra typiska spritsorter.
				</p>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Warung </h2>
				<img src={warung} alt="warung" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				Warung – eller "Hornstulls Bali" som de själva kallar sig – tar med sig en liten bit av Indonesien till trendiga Södermalm. 
				Här serveras indonesiska rätter lagade på säsongsbetonade nordiska råvaror, gärna ekologiska, och du kan även stanna till på en cocktail i deras bar.
				</p>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Tjoget </h2>
				<img src={tjoget} alt="tjoget" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				På Hornsbruksgatan kan du äta finmat i casualmiljö och sippa på en välblandad drink i baren. Här hittar du Tjoget, ett prisbelönt koncept som inkluderar restaurang, cocktailbar, vinbar och ölkafé.
				</p>
				
				

            </div>
        </div>

        </div>
    </div>
    );
}
//<a class='hnet' href='https://bar-bro.se/' target="_blank" title="Opens in a new window">Boka bord här</a>
//				</a>
