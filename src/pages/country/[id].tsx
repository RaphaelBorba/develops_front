import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function CountryData(){
    const [country, setCountry] = useState<any>()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    console.log(router.query.id)
    useEffect(() => {
        const fetchCountries = async () => {
            setLoading(true)
            try {
                const response = await fetch(`http://localhost:3001/country/${router.query.id}`);
                const data = await response.json();
                setCountry(data);
            } catch (error) {
                console.error('Error fetching country data:', error);
            }
            setLoading(false)
        };

        fetchCountries();
    }, [router.query.id]);
    
    if(loading) return <div>Loading ...</div>
    return(
        <main className="flex flex-col gap-4 m-5">
            <h1>Country Name: {country?.countryData?.commonName}</h1>
            <Image src={country?.flagCountry}alt="Country Image" width={100} height={100}/>
            <h2>Borders:</h2>
            <div className="flex gap-4">
            {
                country?.countryData?.borders.map((country:any) => [
                    <div className="flex flex-row gap-4 border rounded-md p-2" key={country.commonName}>
                        <h2>Country: {country.commonName}</h2>
                    </div>
                ])
            }
            </div>
            <h2>Population (year/population):</h2>
            <div className="flex flex-wrap gap-4">
            {
                country?.population.map((yearData:any) => [
                    <div className="flex flex-row gap-4 border rounded-md p-2 min-w-28 px-5" key={country.commonName}>
                        <h2>{yearData.year}: {yearData.value}</h2>
                    </div>
                ])
            }
            </div>
        </main>
    )
}