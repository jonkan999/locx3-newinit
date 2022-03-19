import useCollapse from 'react-collapsed';

import military from './icons/military.png';
import vinterbad from './icons/vinterbad.png';
import soderrunt from './icons/soderrunt.png';
import warung from './icons/warung.png';
import tjoget from './icons/tjoget.png';


export default function CollapsibleHornstull() {
	
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
		expandStyles: {border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"},
		collapseStyles: {border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"},
		duration:10
	});

return (
    <div className="Hornstull-container">
        <div className="header" style={{border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"}}  {...getToggleProps()}>
            {isExpanded ? '' : 'Expand'}
		        <div className="content" style={{border: "solid #ffeeec 0.1px", boxShadow: "0.1px 0.1px 0.1px 0.1px #ffeeec"}} {...getCollapseProps()}>
           
				<h1 style={{ padding: "2vh 5vw", textAlign: "center"}}> Träning och friluftsliv i Tanto </h1>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Vinterbada med Tantos bastuförening </h2>
				<img src={vinterbad} alt="vinterbad" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				Att ta ett vinterbad har både växt och blivit väldigt populärt den senaste tiden. Trenden har även en positiv effekt på kroppen och är hälsosam sägs det. Ett väldigt populärt ställe att basta och vinterbada på är Tantolundens bastuflotte. Här är också icke medlemmar välkomna, en dag i veckan är det enbart herrbastu och en dag dambastu även en dag för mixbastu finns.
				<br/><br/>Läs mer 
				<a style={{ color: "hotpink"}} href='https://www.tantobastuforening.se/' target="_blank" title="Opens in a new window"> här</a>
				</p>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> NMT Military Training </h2>
				<img src={military} alt="military" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				På sommrarna kan man se entusiastiska kamo-prydda motionärer på Tantolundens fält. Det är Nordic Military Training (NMT) som bedriver utomhusträning för alla med militär inspiration. Under ledning av välutbildade instruktörer ger NMT sina vasaller en allsidig träning som bygger träningsprinciper som praktiseras av soldater världen över. Du kommer att träna muskelstyrka, kondition och uthållighet – men även det mentala kommer att sättas på prov. 
				<br/><br/>Läs mer 
				<a style={{ color: "hotpink"}} href='https://nordicmilitarytraining.se/stockholm-tantolunden/' target="_blank" title="Opens in a new window"> här</a>
				</p>
				
				<h2 style={{ padding: "2vh 5vw", textAlign: "center"}}> Stockholms snabbaste mil </h2>
				<img src={soderrunt} alt="soderrunt" style={{display: 'block', marginLeft: 'auto',marginRight: 'auto',width: '70vw'}}/>
				<p style={{ padding: "2vh 5vw", textAlign: "center"}}> 
				10 000 meter. Längs vattnet. Ett varv runt Södermalm. Av många ansedd som Stockholms vackraste. Definitivt den snabbaste. Varje år slår cirka 50% personbästa på Söder Runt. Uppförsbackar? Finns inga. Start och mål i Tantolunde.
				<br/><br/>Läs mer 
				<a style={{ color: "hotpink"}} href='https://www.soderrunt.se/' target="_blank" title="Opens in a new window"> här</a>
				</p>
				
			
				
				

            
        </div>

        </div>
    </div>
    );
}
//<a class='hnet' href='https://bar-bro.se/' target="_blank" title="Opens in a new window">Boka bord här</a>
//				</a>
