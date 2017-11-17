import org.apache.jena.ontology.OntModel;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.ModelFactory;


public class test_query {

    public static void main(String[] args) {
        // TODO Auto-generated method stub

        query();

    }

    public static void query() {

        //Knowledgbase 로드
        String Owlfile = "src/main/resources/test_query.owl";
        OntModel m = ModelFactory.createOntologyModel();
        m.read(Owlfile);


        String queryString = "PREFIX  rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                "PREFIX  rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                "PREFIX kb: <http://KnowledgeBase#>\n" +
                "SELECT  ?date \n" +
                "WHERE\n" +
                " { ?uri rdfs:label   '삼성전자'."
                + "?uri  kb:founder  ?name."
                + "?name kb:dateofbirth ?date}\n";


        Query query = QueryFactory.create(queryString);

        QueryExecution qe = QueryExecutionFactory.create(query, m);
        ResultSet results = qe.execSelect();

        //QuerySolution soln = results.nextSolution();
        //Literal p = soln.getLiteral("calory");


        //System.out.println(p);

        ResultSetFormatter.out(System.out, results, query);

        qe.close();

    }

}
