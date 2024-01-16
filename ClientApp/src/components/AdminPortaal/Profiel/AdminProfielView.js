import React from 'react';
import Layout from '../AdminPortaalLayout';

import placeholderImg from '../../media/placeholder.svg';



export default class Bedrijvenview extends React.Component {
  render() {
    return (
        <Layout>
            <div className='container-fluid'>
              {/* Titel Row */}
              <div className='row'>
                <div className='col-12'><h1>Profiel Gegevens</h1></div>
              </div>
              {/* First fromulier row */}
              <div className='row h-50'>
                {/* column voor de profile card */}
                <div className='col-4'>
                    <div className="card bg-primary">
                        <div className='d-flex justify-content-center align-items-center'>
                            <img className="img-rond p-3" height={300} width={300} src={placeholderImg} alt="test"/>
                        </div>
                        <div className="card-body text-center">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text disabled" id="addon-wrapping">@</span>
                                <input type="text" className="form-control" placeholder="Gebruikersnaam..." aria-label="Username" aria-describedby="addon-wrapping"/>
                            </div>
                            <h3 className="card-text text-center">Telefoon nummer</h3>
                        </div>
                    </div>
                </div>

                {/* Column voor de aanpasbare gegevens */}
                <div className='col-4'>
                    <h3 className='text-center'>Persoons gegevens</h3>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-default">E-mail</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    
                </div>

                {/* Column voor de beperkingen */}
                <div className='col-4'>
                    <h3 className='text-center'>Beperkingen</h3>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupBeperkingen">
                            <option defaultValue={"Kies..."}>Kies...</option>
                            <option value="1">Retarded</option>
                            <option value="2">Doof</option>
                            <option value="3">Joren</option>
                        </select>
                        <label className="input-group-text" for="inputGroupBeperkingen">Beperking Toevoegen</label>
                    </div>
                </div>
              </div>
              {/* Tweede Rij van de forms */}
              <div className='row mt-5'>
                {/* Keuze Select boxen */}
                <div className='col-4'>
                    {/* Commerciëel */}
                    <div class="input-group mb-3">
                        <div className="input-group-text">
                            <input className="form-check-input mt-0"  id="Commercial" type="checkbox" value="" aria-label="Checkbox for following text input"/>
                        </div>
                        <label className="input-group-text" for="Commercial">U wilt benaderd worden door commerciele partijen</label>
                    </div>
                    {/* Telefonisch */}
                    <div class="input-group mb-3">
                        <div className="input-group-text">
                            <input className="form-check-input mt-0" id="Telefonisch" type="checkbox" value="" aria-label="Checkbox for following text input"/>
                        </div>
                        <label className="input-group-text" for="Telefonisch">U wilt telefonisch benaderd worden</label>
                    </div>
                    {/* Email */}
                    <div class="input-group mb-3">
                        <div className="input-group-text">
                            <input className="form-check-input mt-0" id="Email" type="checkbox" value="" aria-label="Checkbox for following text input"/>
                        </div>
                        <label className="input-group-text" for="Email">U wilt via de E-mail benaderd worden</label>
                    </div>
                </div>

                {/* Voogd Gegevens - indien 18+ uitgrijzen */}
                <div className='col-4'>
                    

                </div>

                {/* Hulpmiddelen Selects */}
                <div className='col-4'>
                    <div className="input-group mb-3">
                        <select className="form-select" id="inputGroupHulmiddel">
                            <option selected>Kies...</option>
                            <option value="1">Retarded</option>
                            <option value="2">Doof</option>
                            <option value="3">Joren</option>
                        </select>
                        <label className="input-group-text" for="inputGroupHulmiddel">Hulpmiddel(en)</label>
                    </div>
                </div>
              </div>
            </div>
        </Layout>
    )
  }66
}
