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

    public ResearchRepository() {
        researchList = new ArrayList<>();
        initResearchList();
    }

    // Static research for testing purposes
    // TODO: Remove this and implement a database
    private void initResearchList() {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            Research research1 = new Research(
                    1L, "AI in Healthcare: A Comprehensive Literature Review",
                    "Exploring the use of AI in diagnosing diseases and predicting patient outcomes using large datasets.",
                    Arrays.asList("John Doe", "Jane Smith"), Arrays.asList("health", "AI", "diagnostics"),
                    "Under Review",
                    sdf.parse("2025-10-10"), 15);

            Research research2 = new Research(
                    2L, "Machine Learning for Personalized Medicine",
                    "Investigation of machine learning algorithms that create tailored treatment plans for patients.",
                    Arrays.asList("Alice Brown", "Bob Johnson"), Arrays.asList("health", "AI", "personalized medicine"),
                    "Published", sdf.parse("2025-08-15"), 30);

            Research research3 = new Research(
                    3L, "Deep Learning in Radiology: A Breakthrough for Diagnosing Cancer",
                    "Study on the potential of deep learning techniques to improve diagnostic accuracy in radiology.",
                    Arrays.asList("Emily Davis", "Michael Lee"), Arrays.asList("health", "deep learning", "radiology"),
                    "Under Review", sdf.parse("2025-09-20"), 8);

            Research research4 = new Research(
                    4L, "AI-Driven Drug Discovery and Development",
                    "Reviewing the progress and challenges in using AI for the discovery of new drugs and therapies.",
                    Arrays.asList("Olivia Wilson", "David Harris"), Arrays.asList("health", "AI", "drug discovery"),
                    "Published", sdf.parse("2025-06-30"), 45);

            Research research5 = new Research(
                    5L, "Predicting Disease Progression Using AI Algorithms",
                    "A comprehensive study of AI models that predict the progression of chronic diseases over time.",
                    Arrays.asList("James Clark", "Sophia Turner"), Arrays.asList("health", "AI", "disease progression"),
                    "Under Review", sdf.parse("2025-07-25"), 25);

            Research research6 = new Research(
                    6L, "AI and Robotics: Transforming Surgery",
                    "Exploring the synergy between AI and robotics to revolutionize minimally invasive surgery techniques.",
                    Arrays.asList("Liam King", "Isabella Scott"), Arrays.asList("health", "AI", "robotics", "surgery"),
                    "Published", sdf.parse("2025-05-10"), 60);

            Research research7 = new Research(
                    7L, "Artificial Intelligence in Epidemiology: Tracking Disease Outbreaks",
                    "Investigating how AI can enhance epidemiological studies and assist in the early detection of disease outbreaks.",
                    Arrays.asList("Michael Adams", "Emma Martinez"), Arrays.asList("health", "AI", "epidemiology"),
                    "Under Review", sdf.parse("2025-04-01"), 10);

            Research research8 = new Research(
                    8L, "AI-Assisted Diagnosis of Neurological Disorders",
                    "Examining the potential of AI algorithms in diagnosing various neurological conditions.",
                    Arrays.asList("Lucas Moore", "Ava Young"), Arrays.asList("health", "AI", "neurology"),
                    "Published", sdf.parse("2025-03-15"), 18);

            Research research9 = new Research(
                    9L, "The Future of AI in Mental Health Diagnosis",
                    "Reviewing AI tools that aid in diagnosing and treating mental health disorders.",
                    Arrays.asList("Elijah White", "Mia Harris"), Arrays.asList("health", "AI", "mental health"),
                    "Under Review", sdf.parse("2025-11-20"), 12);

            researchList.add(research1);
            researchList.add(research2);
            researchList.add(research3);
            researchList.add(research4);
            researchList.add(research5);
            researchList.add(research6);
            researchList.add(research7);
            researchList.add(research8);
            researchList.add(research9);
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
}