import React from 'react';
import { footer} from 'reactstrap';

class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer font-small blue pt-4" style={styles.whole}>
        <div className="container-fluid text-center text-md-left" style={styles.top}>
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase" style={{margin: '20px 0 10px'}}>Help :</h5>
              <p>Change orderStatus of Items from top table then the Item will be added to bottom table (Changed Sipments Table)
               { this.props.role === 'admin' 
                    ? 'You can assigne a biker to bootom table items or de assingn biker of the items in top table'
                    : 'And a something will pop up to set a time for parcel if the item is PICKING_UP or DELIVERING'
                }
                And Finally You can submit changes
              </p>

            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
          </div>
        </div>
        <div className="footer-copyright text-center py-3" style={styles.bottom}>© 2019 Copyright :
          <a style={styles.tag} href="https://github.com/hoseingp/"> H.Ekrami</a>
          <span>{' for '}</span>
          <a style={styles.tag} href="https://saloodo.com/"> Saloodo Company</a>
        </div>
      </footer>
    );
  }
}
const styles = {
  whole: {
    width: '100%',
    color: '#FFF',
    textAlign: 'center'
  },
  top: {
    backgroundColor: '#2196F3'
  },
  bottom: {
    backgroundColor: '#1A78C3'
  },
  tag: {
    color: '#FFF'
  }
}
export { Footer };