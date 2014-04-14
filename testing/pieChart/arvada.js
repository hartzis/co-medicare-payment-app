d3.csv("arvada.csv", function(d) {
	return {
		provider: d.Provider,
		specialty: d.Specialty,
		city: d.City,
		state: d.State,
		payment: +(d.Payments).replace(/$/, '')
	};
});