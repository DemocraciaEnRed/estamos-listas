// Para ejecutar hacer:
// mongo localhost:26017/estamos-listas-prod --quiet export_votantes.js > estamos-listas-votos-listado.csv

/*function dateToStr(date){
	// ISOString = 2020-07-08T15:35:57.541Z
	let parts = date.toISOString().split('T')
	let ds = parts[0].split('-')
	let ts = parts[1].split(':')
	return `${ds[2]}/${ds[1]}/${ds[0]}` 
}*/

print('Fecha,Voto,Nombre,Apellido,Email')

let u, str;

db.votes.find().forEach(v => {
	//u = db.users.findOne(v.author)
	str = `
		${v.createdAt.toISOString()},
		"${v.value}"
		//"${u.firstName}",
		//"${u.lastName}",
		//${u.email}
	`
	print(str.replace(/[\n\t]/g, ''))
})

