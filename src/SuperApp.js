class SuperApp extends React.Component {
render() {
        return (
            <div>
                 <MyProvider>
                      <div className="SuperApp">
                      <App />
					  <Street />
                      </div>
               </MyProvider>
            </div>
        );
}
}