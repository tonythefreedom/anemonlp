import org.apache.jena.ontology.DatatypeProperty;
import org.apache.jena.ontology.Individual;
import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.rdf.model.ModelFactory;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class example01 {
    public static void main(String[] args) throws IOException {
        //owl 파일 로드
        String Owlfile = "src/main/resources/example01.owl";
        OntModel model = ModelFactory.createOntologyModel();
        model.read(Owlfile);

        //사람 Class get
        OntClass person_class = model.getOntClass("http://KnowledgeBase#Person");

        //사람 indvidual 생성
        Individual person_ind = model.createIndividual("http://KnowledgeBase#Person001", person_class);

        //FullName Property get
        DatatypeProperty dp = model.getDatatypeProperty("http://KnowledgeBase#Name");

        //Person001 FullName 김연아 - triple 구조 생성
        person_ind.addProperty(dp, "김연아");

        Writer fw;
        try {
            fw = new FileWriter(Owlfile);
            model.write(fw, "RDF/XML");
            model.write(System.out, "RDF/XML");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}