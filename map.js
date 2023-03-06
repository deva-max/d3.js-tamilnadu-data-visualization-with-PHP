d3.html("../navigation.html")
d3.html("../slider.html")
function createMap(d)
{
var width = 660,
			height = 660,
			centered = null,
			District = null,
			flag = 0; 
		var path;
		var group;
		var areas;
		var canvas = d3.select("body").append("svg")
			.attr("width", width)
			.attr("height", height)
			.style("display", "block")
			.style("margin-left", "auto")
			.style("margin-right", "auto")
			
        

		d3.json("TamilNadu.geojson", function(data){

			

				 group = canvas.selectAll("g")
					.data(data.features)
					.enter()
					.append("g")
				var center = d3.geo.centroid(data)
				var projection = d3.geo.mercator()
					.scale(5500)
					.center(center)
					.translate([width/2,height/2]);
				path = d3.geo.path().projection(projection);
				var tooltip = d3.select('body').append('div')
	            .attr('class', 'hidden tooltip')
				areas = group.append("path")
					.attr("d", path)
					.attr("class", "area")
					.attr("fill", function getRandomColor() {
						var new_light_color = 'rgb(' + 255 + ',' + 255 + ',' + 255 + ')';
					    return new_light_color;
					})
					.style('fill', function(d){
						if (d.properties.NAME_2 === 'Chennai' || d.properties.NAME_2 === 'Thoothukudi' || d.properties.NAME_2 === 'Tirunelveli'|| d.properties.NAME_2 === 'trichy'){
							return '#87CEEB'
							}
					})
					.style("stroke","black")
					.style("tooltip", "check")
					.on("click", clicked)
					
					//while mouse hover display district
					//&& d.properties.NAME_2 == 'Thoothukudi' && d.properties.NAME_2 == 'trichy' && d.properties.NAME_2 == 'Tirunelveli'
					.on('mouseover', function(d) {
						//console.log(d);

						var mouse = d3.mouse(areas.node()).map(function(d) {
							return parseInt(d);
						});

						if(d.properties.NAME_2 === 'trichy' || d.properties.NAME_2 === 'Thoothukudi' || d.properties.NAME_2 === 'Chennai' || d.properties.NAME_2 === 'Tirunelveli'){
							tooltip.classed('hidden', false)
								.attr('style', 'right:' + (mouse[0] + 1) +'px; top:' + (mouse[1] - 1) + 'px')
								.style("font", "15px georgia")
								.style("font-weight", 700)
								.style("color", "black")
								.style("padding","10px")
								.style("border", '2px solid #ffca17')
								.style("background-color", "white")	
								.html("<table><tr><td><div id = 'area'></td><td>"+d.properties.ay_partn+"<br>"+d.properties.NAME_1+", "+d.properties.NAME_0+"</td></tr></table>")
								$('<img>').attr('src',d.properties.ay_partn_logo).appendTo($('div#area'));

							//console.log(d);
							
						}
					})
				
                .on('mouseout', function() {
                    tooltip.classed('hidden', true);
                })
					
				//show districts
				
					group.append("text")
					.attr("x", function(d){ return path.centroid(d)[0]; })
					.attr("y", function(d){ return path.centroid(d)[1]; })
					.attr("text-anchor", "right")
					.attr('font-size','9pt')
					.style("background-color", "#EFEFEF")
					.style("font-weight", 700)
					.text(function(d){
						if (d.properties.NAME_2 === 'Chennai' || d.properties.NAME_2 === 'Thoothukudi' || d.properties.NAME_2 === 'Tirunelveli'|| d.properties.NAME_2 === 'trichy'){
							 return d.properties.NAME_2; 
						}
					}) 
										
			});
			

		 function state_clicked(d) {
			 
		   /*group.selectAll([""]).remove();
		      District = null;
		      if (District) {
		      	g.selectAll("#" + District.id).style('display', null);
		      }*/
		      if (d && District !== d) {

				
		      
		        District = d.properties.NAME_2;
		        
		        if (d.properties.NAME_2  == 'Tamilnadu') {
		          d3.json("Tamilnadu.geojson", function(error, us) {
		            group.append("g")
		            	.attr("class", "Districts")
		              .selectAll("path")
		              .data(us.features)
		              .enter()
		              .append("path")
		              .attr("d", path)
		              
					.style("stroke","black")
					.on("click", clicked)
		                
		          });      
		        } 
		      } else {
		        var xyz = [width / 2, height / 1.5, 1];
		        District = null;
		        
		      }
		    }
		    
		function clicked(d) {
			  var x, y, k;
			  if (flag == 0) {
			    var centroid = path.centroid(d);
			    x = centroid[0];
			    y = centroid[1];
			    k = 4;
			    centered = d;
			    state_clicked(d);
			    flag = 1;
			  } else {
			    x = width / 2;
			    y = height / 2;
			    k = 1;
			    centered = null;
			    group.selectAll(".Districts").remove();
			    flag = 0;
			  }

			  /* if(state == null)
				  state_clicked(d);
			  else
				  {
				  	group.selectAll(".states").remove();
				  	x = width / 2;
				    y = height / 2;
				    k = 1;
				    state==null;
				  } */
			  group.selectAll("path")
			      .classed("active", centered && function(d) { return d === centered; });

			  group.transition()
			      .duration(750)
			      .attr("transform", "translate(" + width / 2+ "," + height / 2+ ")scale(" + k + ")translate(" + -x + "," + -y + ")")
			      .style("stroke-width", 1 / k + "px");
			
			}


		/* var zoom = d3.behavior.zoom()
	    .on("zoom",function() {
	        group.attr("transform","translate("+ 
	            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
	        group.selectAll("circle")
	            .attr("d", path.projection(projection));
	        group.selectAll("path")  
	            .attr("d", path.projection(projection)); 

	  });

	canvas.call(zoom) */
		
}