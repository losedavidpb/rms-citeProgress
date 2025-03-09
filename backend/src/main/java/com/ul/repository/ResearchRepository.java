package com.ul.repository;

import java.util.ArrayList;
import java.util.List;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.springframework.stereotype.Repository;

import com.ul.model.Research;

import java.util.Arrays;

@Repository
public class ResearchRepository {
    private List<Research> researchList;

    private static long lastID = 1L;

    public ResearchRepository() {
        researchList = new ArrayList<>();
        initResearchList();
    }

    // Static research for testing purposes
    // TODO: Remove this and implement a database
    private void initResearchList() {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            addResearch(new Research(
                -1, "AI in Healthcare: A Comprehensive Literature Review",
                "Exploring the use of AI in diagnosing diseases and predicting patient outcomes using large datasets.",
                Arrays.asList("John Doe", "Jane Smith"), Arrays.asList("health", "AI", "diagnostics"),
                "Under Review",
                sdf.parse("2025-10-10"), 15
            ));

            addResearch(new Research(
                -1, "Machine Learning for Personalized Medicine",
                "Investigation of machine learning algorithms that create tailored treatment plans for patients.",
                Arrays.asList("Alice Brown", "Bob Johnson"), Arrays.asList("health", "AI", "personalized medicine"),
                "Published", sdf.parse("2025-08-15"), 30
            ));

             addResearch(new Research(
                -1, "Deep Learning in Radiology: A Breakthrough for Diagnosing Cancer",
                "Study on the potential of deep learning techniques to improve diagnostic accuracy in radiology.",
                Arrays.asList("Emily Davis", "Michael Lee"), Arrays.asList("health", "deep learning", "radiology"),
                "Under Review", sdf.parse("2025-09-20"), 8
            ));

             addResearch(new Research(
                -1, "AI-Driven Drug Discovery and Development",
                "Reviewing the progress and challenges in using AI for the discovery of new drugs and therapies.",
                Arrays.asList("Olivia Wilson", "David Harris"), Arrays.asList("health", "AI", "drug discovery"),
                "Published", sdf.parse("2025-06-30"), 45
            ));

            addResearch(new Research(
                lastID++, "Predicting Disease Progression Using AI Algorithms",
                "A comprehensive study of AI models that predict the progression of chronic diseases over time.",
                Arrays.asList("James Clark", "Sophia Turner"), Arrays.asList("health", "AI", "disease progression"),
                "Under Review", sdf.parse("2025-07-25"), 25));

            addResearch(new Research(
                -1, "AI and Robotics: Transforming Surgery",
                "Exploring the synergy between AI and robotics to revolutionize minimally invasive surgery techniques.",
                Arrays.asList("Liam King", "Isabella Scott"), Arrays.asList("health", "AI", "robotics", "surgery"),
                "Published", sdf.parse("2025-05-10"), 60
            ));

            addResearch(new Research(
                -1, "Artificial Intelligence in Epidemiology: Tracking Disease Outbreaks",
                "Investigating how AI can enhance epidemiological studies and assist in the early detection of disease outbreaks.",
                Arrays.asList("Michael Adams", "Emma Martinez"), Arrays.asList("health", "AI", "epidemiology"),
                "Under Review", sdf.parse("2025-04-01"), 10
            ));

            addResearch(new Research(
                -1, "AI-Assisted Diagnosis of Neurological Disorders",
                "Examining the potential of AI algorithms in diagnosing various neurological conditions.",
                Arrays.asList("Lucas Moore", "Ava Young"), Arrays.asList("health", "AI", "neurology"),
                "Published", sdf.parse("2025-03-15"), 18
            ));

             addResearch(new Research(
                -1, "The Future of AI in Mental Health Diagnosis",
                "Reviewing AI tools that aid in diagnosing and treating mental health disorders.",
                Arrays.asList("Elijah White", "Mia Harris"), Arrays.asList("health", "AI", "mental health"),
                "Under Review", sdf.parse("2025-11-20"), 12
            ));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public Research findById(long ID) {
        for (int i = 0; i < researchList.size(); i++) {
            if (researchList.get(i).getID() == ID) {
                return researchList.get(i);
            }
        }

        return null;
    }

    public List<Research> findAll() {
        return this.researchList;
    }

    public boolean addResearch(Research research) {
        if (!researchList.contains(research)) {
            research.setID(lastID++);
            researchList.add(research);
            return true;
        }

        return false;
    }

    public long getLastID() {
        return lastID;
    }
}