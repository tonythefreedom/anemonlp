import org.apache.jena.ontology.DatatypeProperty;
import org.apache.jena.ontology.Individual;
import org.apache.jena.ontology.OntClass;
import org.apache.jena.ontology.OntModel;
import org.apache.jena.rdf.model.ModelFactory;

import java.io.*;

public class example02 {

    public static void main(String[] args) {
        // TODO Auto-generated method stub

        knowledgebase();
    }

    //온톨로지 자동화
    public static void knowledgebase() {

        //Class Name 정의
        String individual = "Company";

        try {

            //Low Data 로드
            String fileName = "src/main/resources/company.txt";
            String line = "";
            BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(fileName), "UTF-8"));

            //owl 파일 로드
            String Owlfile = "src/main/resources/example02.owl";
            OntModel m = ModelFactory.createOntologyModel();
            m.read(Owlfile);

            //class 생성
            // OntClass res = m.createClass("urn:absolute:www.inbi.ai/knowledgebase/" + individual);

            OntClass res = m.getOntClass("http://KnowledgeBase#Company");

            int num = 0;

            //low data 한줄 씩 읽어옴
            while ((line = br.readLine()) != null) {
                System.out.println(line);

                num++;

                //individual 생성
                Individual ind = m.createIndividual("http://KnowledgeBase#" + individual + num, res);

                String date[] = line.split("@");

                //생성된 individual에 label 추가
                System.out.println(date[0]);
                ind.addLabel(date[0], "kr");

                //individual에 property 추가
                DatatypeProperty dp = m.getDatatypeProperty("http://KnowledgeBase#explain");
                ind.addProperty(dp, date[1]);

            }


            //owl 파일 저장
            Writer fw;
            try {
                fw = new FileWriter(Owlfile);

                m.write(fw, "RDF/XML");

                //m.write(System.out, "RDF/XML");
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            br.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
