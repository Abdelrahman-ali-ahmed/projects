import React from "react";
import "./giude.css";
import { useSelector } from "react-redux";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
function Guide() {
  const categoryName = useSelector((state) => state.categoryName);
  console.log(categoryName);
  const content = () => {
    switch (categoryName) {
      case "Difficulty Learning":
        return (
          <div>
            {" "}
            <h2>Guide for Individuals with Difficulty Learning</h2>
            <h3>1. Understanding Individual Needs</h3>
            <p>
              <strong>Assessment:</strong> Start with an assessment to
              understand specific learning challenges.
            </p>
            <p>
              <strong>Individualized Approach:</strong> Customize learning plans
              based on individual assessments.
            </p>
            <h3>2. Structured Environment</h3>
            <p>
              <strong>Consistent Routine:</strong> Establish a consistent daily
              routine to provide stability.
            </p>
            <p>
              <strong>Organized Space:</strong> Create an organized and
              distraction-free learning environment.
            </p>
            <h3>3. Clear and Simple Instructions</h3>
            <p>
              <strong>Step-by-Step Instructions:</strong> Break tasks into
              small, manageable steps.
            </p>
            <p>
              <strong>Clear Language:</strong> Use simple and clear language.
            </p>
            <p>
              <strong>Visual Aids:</strong> Incorporate visual aids like charts,
              diagrams, and pictures to explain concepts.
            </p>
            <h3>4. Multisensory Learning</h3>
            <p>
              <strong>Auditory:</strong> Use verbal instructions and
              discussions.
            </p>
            <p>
              <strong>Visual:</strong> Incorporate videos, diagrams, and written
              instructions.
            </p>
            <p>
              <strong>Kinesthetic:</strong> Include hands-on activities and
              physical movement in learning tasks.
            </p>
            <h3>5. Repetition and Practice</h3>
            <p>
              <strong>Frequent Review:</strong> Regularly review previous
              lessons to reinforce learning.
            </p>
            <p>
              <strong>Practice:</strong> Provide ample opportunities for
              practice in various contexts.
            </p>
            <h3>6. Positive Reinforcement</h3>
            <p>
              <strong>Praise and Encouragement:</strong> Use positive
              reinforcement to motivate and build confidence.
            </p>
            <p>
              <strong>Reward System:</strong> Implement a reward system for
              achieving milestones.
            </p>
            <h3>7. Technology and Tools</h3>
            <p>
              <strong>Assistive Technology:</strong> Utilize tools such as
              speech-to-text software, audiobooks, and educational apps.
            </p>
            <p>
              <strong>Interactive Learning:</strong> Engage learners with
              interactive and gamified learning platforms.
            </p>
            <h3>8. Collaboration with Specialists</h3>
            <p>
              <strong>Special Educators:</strong> Work with special education
              professionals to develop effective strategies.
            </p>
            <p>
              <strong>Therapists:</strong> Engage with occupational and speech
              therapists for additional support.
            </p>
            <h3>9. Parental/Guardian Involvement</h3>
            <p>
              <strong>Training for Caregivers:</strong> Provide training for
              parents/guardians to support learning at home.
            </p>
            <p>
              <strong>Regular Communication:</strong> Maintain regular
              communication with caregivers about progress and challenges.
            </p>
            <h3>10. Adaptable Curriculum</h3>
            <p>
              <strong>Flexible Pacing:</strong> Allow learners to progress at
              their own pace.
            </p>
            <p>
              <strong>Custom Materials:</strong> Adapt learning materials to
              suit individual needs and learning styles.
            </p>
            <h3>Sample Activities and Strategies</h3>
            <h4>For Reading Difficulties:</h4>
            <p>
              <strong>Phonics Programs:</strong> Use phonics-based reading
              programs.
            </p>
            <p>
              <strong>Audiobooks:</strong> Provide audiobooks alongside printed
              text.
            </p>
            <p>
              <strong>Highlighting Texts:</strong> Encourage highlighting key
              information in texts.
            </p>
            <h4>For Writing Difficulties:</h4>
            <p>
              <strong>Graphic Organizers:</strong> Use graphic organizers to
              plan writing.
            </p>
            <p>
              <strong>Typing Programs:</strong> Introduce typing programs if
              writing by hand is difficult.
            </p>
            <p>
              <strong>Voice-to-Text Tools:</strong> Use voice-to-text tools for
              written assignments.
            </p>
            <h4>For Math Difficulties:</h4>
            <p>
              <strong>Manipulatives:</strong> Use physical objects (blocks,
              beads) to teach math concepts.
            </p>
            <p>
              <strong>Visual Aids:</strong> Incorporate charts, number lines,
              and visual representations of problems.
            </p>
            <p>
              <strong>Step-by-Step Solutions:</strong> Break down math problems
              into step-by-step solutions.
            </p>
            <h3>Conclusion</h3>
            <p>
                Creating a guide for individuals with learning difficulties
              requires a compassionate, flexible, and tailored approach. By
              understanding each learner's unique needs and employing a variety
              of strategies, educators and caregivers can significantly enhance
              the learning experience and outcomes for those facing challenges.
              
            </p>{" "}
          </div>
        );
        break;
      case "Autism":
        return (
          <div>
            <article>
              <h2>Interacting with Individuals with Autism</h2>

              <section>
                <h3>1. Respect Boundaries</h3>
                <p>
                  Some individuals with autism may have specific personal space
                  boundaries or sensory sensitivities. Be mindful of their
                  comfort levels and respect any cues they give about personal
                  space.
                </p>
              </section>

              <section>
                <h3>2. Use Clear Communication</h3>
                <p>
                  Speak clearly and directly, avoiding sarcasm, idioms, or
                  ambiguous language that could be confusing. Be patient if they
                  need extra time to process information or formulate a
                  response.
                </p>
              </section>

              <section>
                <h3>3. Be Aware of Sensory Sensitivities</h3>
                <p>
                  Many individuals with autism are sensitive to sensory stimuli
                  such as loud noises, bright lights, or certain textures. Try
                  to minimize sensory overload if possible, or be understanding
                  if they need to take breaks.
                </p>
              </section>

              <section>
                <h3>4. Focus on Their Strengths</h3>
                <p>
                  Autism presents differently in each person, so focus on their
                  strengths and interests rather than making assumptions based
                  on stereotypes or generalizations.
                </p>
              </section>

              <section>
                <h3>5. Be Patient and Flexible</h3>
                <p>
                  Communication and social interactions may be challenging for
                  some individuals with autism. Be patient if they struggle with
                  social cues or social norms, and be open to adapting your
                  communication style if needed.
                </p>
              </section>

              <section>
                <h3>6. Listen Actively</h3>
                <p>
                  Show that you're listening by nodding, maintaining eye contact
                  (if comfortable for them), and giving them time to express
                  themselves. Validate their feelings and opinions.
                </p>
              </section>

              <section>
                <h3>7. Avoid Judgment</h3>
                <p>
                  Everyone is unique, and behaviors associated with autism can
                  vary widely. Avoid making assumptions or judgments based on
                  limited understanding or stereotypes.
                </p>
              </section>

              <section>
                <h3>8. Ask About Preferences</h3>
                <p>
                  If you're unsure how to best interact with someone with
                  autism, don't hesitate to ask them or their caregivers about
                  their preferences and any specific accommodations they might
                  need.
                </p>
              </section>

              <section>
                <h3>9. Be Inclusive</h3>
                <p>
                  Include individuals with autism in conversations and
                  activities whenever possible. Respect their choices and
                  support their participation in ways that are comfortable for
                  them.
                </p>
              </section>

              <section>
                <h3>10. Educate Yourself</h3>
                <p>
                  Take the initiative to learn more about autism and its
                  spectrum. Understanding their perspective can go a long way in
                  building a positive and respectful interaction.
                </p>
              </section>
            </article>
          </div>
        );
        break;
      case "Hyberactivity":
        return (
          <div>
            {" "}
            <h2>Interacting with a Child with Hyperactivity</h2>
            <p>
              When interacting with a child who has hyperactivity, it's
              important to approach the situation with patience, understanding,
              and a structured approach. Here are some tips on how to behave:
            </p>
            <h3>1. Be Patient</h3>
            <p>
              Understand that children with hyperactivity may have difficulty
              focusing, sitting still, or following instructions. Patience is
              crucial in these situations.
            </p>
            <h3>2. Set Clear Boundaries and Expectations</h3>
            <p>
              Establish clear rules and routines. Children with hyperactivity
              often respond well to structured environments where they know what
              is expected of them.
            </p>
            <h3>3. Use Positive Reinforcement</h3>
            <p>
              Acknowledge and reward good behavior. Positive reinforcement can
              encourage the child to repeat desirable actions.
            </p>
            <h3>4. Provide Clear Instructions</h3>
            <p>
              Give one direction at a time and keep instructions simple and
              concise. Break tasks into smaller steps if needed.
            </p>
            <h3>5. Encourage Physical Activity</h3>
            <p>
              Allow the child to engage in physical activities that can help
              them release excess energy in a positive way.
            </p>
            <h3>6. Create a Calm Environment</h3>
            <p>
              Minimize distractions and create a quiet, organized space for
              activities that require concentration.
            </p>
            <h3>7. Use Visual Aids</h3>
            <p>
              Visual schedules or charts can help the child understand routines
              and transitions.
            </p>
            <h3>8. Listen Actively</h3>
            <p>
              When the child speaks, give them your full attention. Active
              listening shows that you value their thoughts and feelings.
            </p>
            <h3>9. Model Calm Behavior</h3>
            <p>
              Children often mirror the behavior of adults around them. Stay
              calm and composed, even in challenging situations.
            </p>
            <h3>10. Seek Support</h3>
            <p>
              If you're a parent or caregiver, consider joining support groups
              or seeking guidance from professionals who specialize in working
              with children with hyperactivity.
            </p>
            <p>
              Remember, every child is unique, so it's essential to adapt your
              approach based on their individual needs and personality. Showing
              empathy and consistency in your interactions can make a
              significant difference in how well you can support a child with
              hyperactivity.
            </p>{" "}
          </div>
        );
      default:
        <div></div>;
    }
  };
  return (
    <div>
      <Typography mt={5}>
      <div className="content">{content()}</div>
      </Typography>
    </div>
  );
}

export default Guide;
