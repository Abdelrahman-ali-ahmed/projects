import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./result.css";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
function Result() {
  const scorefinal = useSelector((state) => state.scorefinal);
  const test = useSelector((state) => state.test);
  const token = useSelector((state) => state.token);
  const age = useSelector((state) => state.age);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      console.error("Token is missing");
      setError("Token is missing");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/specified-results", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }) // parse JSON response
      .then((result) => {
        if (result.data) {
          console.log(result.data);
          setResult(result.data);
        } else {
          console.error("Unexpected response format", result);
          setError("Unexpected response format");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch results");
      });
  }, [token, test]);

  const getIQLevel = (points) => {
    if (points === 95) return "that child is talented";
    if (points >= 90 && points <= 94) return "that child is superior";
    if (points >= 75 && points <= 89) return "that child is high average";
    if (points >= 50 && points <= 74) return "that child is average";
    if (points >= 25 && points <= 49) return "that child is less than average";
    if (points >= 10 && points <= 24) return "that child will have retardation";
    if (points >= 5 && points <= 9) return "that child is simple retardation";
    if (points < 5) return "that child is severe retardation";
  };

  const getPoints = (score, age) => {
    const ageRanges = {
      6: [
        [28, 36, 95],
        [24, 27, 90],
        [21, 23, 75],
        [17, 20, 50],
        [14, 16, 25],
        [11, 13, 10],
        [9, 10, 5],
        [0, 8, 0],
      ],
      7: [
        [28, 36, 95],
        [27, 27, 90],
        [23, 26, 75],
        [19, 22, 50],
        [15, 18, 25],
        [13, 14, 10],
        [11, 12, 5],
        [0, 10, 0],
      ],
      8: [
        [30, 36, 95],
        [29, 29, 90],
        [26, 28, 75],
        [21, 25, 50],
        [17, 20, 25],
        [15, 16, 10],
        [13, 14, 5],
        [0, 12, 0],
      ],
      9: [
        [31, 36, 95],
        [30, 30, 90],
        [27, 29, 75],
        [23, 26, 50],
        [18, 22, 25],
        [17, 17, 10],
        [15, 16, 5],
        [0, 14, 0],
      ],
      10: [
        [32, 36, 95],
        [31, 31, 90],
        [30, 30, 75],
        [26, 29, 50],
        [21, 25, 25],
        [18, 20, 10],
        [17, 17, 5],
        [0, 16, 0],
      ],
      11: [
        [33, 36, 95],
        [29, 32, 90],
        [26, 28, 75],
        [21, 25, 50],
        [16, 20, 25],
        [15, 15, 10],
        [8, 14, 5],
        [0, 7, 0],
      ],
      12: [
        [33, 36, 95],
        [29, 32, 90],
        [28, 28, 75],
        [23, 27, 50],
        [17, 22, 25],
        [16, 16, 10],
        [8, 15, 5],
        [0, 7, 0],
      ],
      13: [
        [34, 36, 95],
        [32, 33, 90],
        [28, 31, 75],
        [23, 27, 50],
        [18, 22, 25],
        [16, 17, 10],
        [9, 15, 5],
        [0, 8, 0],
      ],
      14: [
        [35, 36, 95],
        [34, 34, 90],
        [31, 33, 75],
        [26, 30, 50],
        [21, 25, 25],
        [19, 20, 10],
        [11, 18, 5],
        [0, 10, 0],
      ],
      15: [
        [35, 36, 95],
        [32, 34, 90],
        [29, 31, 75],
        [25, 28, 50],
        [20, 24, 25],
        [18, 19, 10],
        [9, 17, 5],
        [0, 8, 0],
      ],
    };

    const ranges = ageRanges[age];
    if (ranges) {
      for (let range of ranges) {
        if (score >= range[0] && score <= range[1]) {
          return range[2];
        }
      }
    }
    return 0;
  };

  function splitScore(totalScore, percent1, percent2, percent3) {
    if (percent1 + percent2 + percent3 !== 100) {
      throw new Error("The sum of the percentages must be 100.");
    }

    let part1 = totalScore * (percent1 / 100);
    let part2 = totalScore * (percent2 / 100);
    let part3 = totalScore * (percent3 / 100);

    return {
      part1: part1,
      part2: part2,
      part3: part3,
    };
  }

  const handleResult = () => {
    switch (test) {
      case 6:
        let totalScore = scorefinal;
        let part1 = 50;
        let part2 = 24;
        let part3 = 26;
        let count = 0;
        let result = splitScore(totalScore, part1, part2, part3);
        let { part1: part12, part2: part22, part3: part32 } = result;
        if (part12 >= 25 && part12 <= 53) {
          count = count + 0;
        } else if (part12 > 53 && part12 <= 68) {
          count = +1;
        } else if (part12 > 68 && part12 <= 125) {
          count = +2;
        }
        
        if (part22 >= 12 && part22 <= 22) {
          count = count + 0;
        } else if (part22 > 22 && part22 <= 28) {
          count = +1;
        } else if (part22 > 28 && part22 <= 60) {
          count = +2;
        }
        if (part32 >= 13 && part32 <= 21) {
          count = count + 0;
        } else if (part32 > 21 && part32 <= 27) {
          count = +1;
        } else if (part32 > 27 && part32 <= 65) {
          count = +2;
        }

        if (count >= 2) {
          return (
            <div>
              <p>that chiled have learning deffculity </p>
            </div>
          );
        } else {
          return (
            <div>
              <p>that chiled not have learning deffculity </p>
            </div>
          );
        }

        break;

      case 5:
        let message = "Invalid test type";
        let points = 0;
        points = getPoints(scorefinal, age);
        message = getIQLevel(points);
        return message;
        break;
      case 3:
        return scorefinal > 49
          ? "That child has ADHD"
          : "That child does not have ADHD";
        break;
      case 4:
        return scorefinal > 90
          ? "That child has anxiety"
          : "That child does not have anxiety";
        break;
      case 1:
        const autismScore = scorefinal / 3;
        let degree = 0;

        if (autismScore >= 0 && autismScore <= 14) {
          degree = 1;
        } else if (autismScore > 14 && autismScore <= 28) {
          degree = 2;
        } else if (autismScore > 28 && autismScore <= 43) {
          degree = 3;
        }

        degree = degree * 3;

        if (degree >= 7) {
          return (
            <div>
              <p>Child has autism</p>
            </div>
          );
        } else if (degree >= 4 && degree <= 6) {
          return (
            <div>
              <p>Child may have autism</p>
            </div>
          );
        } else if (degree >= 1 && degree <= 3) {
          return (
            <div>
              <p>Child likely does not have autism</p>
            </div>
          );
        }
        break;
      case 2:
        const autismSscondeScore = scorefinal / 6;
        let degree2 = 0;
        let autiusmpoint = 0;

        if (autismSscondeScore >= 0 && autismSscondeScore <= 6) {
          degree2 = 5;
        } else if (autismSscondeScore > 6 && autismSscondeScore <= 9) {
          degree2 = 6;
        } else if (autismSscondeScore > 9 && autismSscondeScore <= 13) {
          degree2 = 7;
        } else if (autismSscondeScore > 13 && autismSscondeScore <= 16) {
          degree2 = 8;
        } else if (autismSscondeScore > 16 && autismSscondeScore <= 19) {
          degree2 = 9;
        } else if (autismSscondeScore > 19 && autismSscondeScore <= 22) {
          degree2 = 10;
        } else if (autismSscondeScore > 22 && autismSscondeScore <= 26) {
          degree2 = 11;
        } else if (autismSscondeScore > 26 && autismSscondeScore <= 29) {
          degree2 = 12;
        }

        degree2 = degree2 * 6;

        switch (degree2) {
          case 72:
            autiusmpoint = 140;
            break;
          case 71:
            autiusmpoint = 139;
            break;
          case 70:
            autiusmpoint = 138;
            break;
          case 69:
            autiusmpoint = 137;
            break;
          case 68:
            autiusmpoint = 136;
            break;
          case 67:
            autiusmpoint = 135;
            break;
          case 66:
            autiusmpoint = 134;
            break;
          case 65:
            autiusmpoint = 133;
            break;
          case 64:
            autiusmpoint = 132;
            break;
          case 63:
            autiusmpoint = 131;
            break;
          case 62:
            autiusmpoint = 130;
            break;
          case 61:
            autiusmpoint = 129;
            break;
          case 60:
            autiusmpoint = 128;
            break;
          case 59:
            autiusmpoint = 127;
            break;
          case 58:
            autiusmpoint = 126;
            break;
          case 57:
            autiusmpoint = 125;
            break;
          case 56:
            autiusmpoint = 124;
            break;
          case 55:
            autiusmpoint = 123;
            break;
          case 54:
            autiusmpoint = 122;
            break;
          case 53:
            autiusmpoint = 121;
            break;
          case 52:
            autiusmpoint = 120;
            break;
          case 51:
            autiusmpoint = 119;
            break;
          case 50:
            autiusmpoint = 118;
            break;
          case 49:
            autiusmpoint = 117;
            break;
          case 48:
            autiusmpoint = 116;
            break;
          case 47:
            autiusmpoint = 115;
            break;
          case 46:
            autiusmpoint = 114;
            break;
          case 45:
            autiusmpoint = 113;
            break;
          case 44:
            autiusmpoint = 112;
            break;
          case 43:
            autiusmpoint = 111;
            break;
          case 42:
            autiusmpoint = 110;
            break;
          case 41:
            autiusmpoint = 109;
            break;
          case 40:
            autiusmpoint = 108;
            break;
          case 39:
            autiusmpoint = 107;
            break;
          case 38:
            autiusmpoint = 106;
            break;
          case 37:
            autiusmpoint = 105;
            break;
          case 36:
            autiusmpoint = 104;
            break;
          case 35:
            autiusmpoint = 103;
            break;
          case 34:
            autiusmpoint = 102;
            break;
          case 33:
            autiusmpoint = 101;
            break;
          case 32:
            autiusmpoint = 100;
            break;
          case 31:
            autiusmpoint = 99;
            break;
          case 30:
            autiusmpoint = 98;
            break;
          case 29:
            autiusmpoint = 97;
            break;
          case 28:
            autiusmpoint = 96;
            break;
          case 27:
            autiusmpoint = 95;
            break;
          case 26:
            autiusmpoint = 94;
            break;
          case 25:
            autiusmpoint = 93;
            break;
          case 24:
            autiusmpoint = 92;
            break;
          case 23:
            autiusmpoint = 91;
            break;
          case 22:
            autiusmpoint = 90;
            break;
          case 21:
            autiusmpoint = 89;
            break;
          case 20:
            autiusmpoint = 88;
            break;
          case 19:
            autiusmpoint = 87;
            break;
          case 18:
            autiusmpoint = 86;
            break;
          case 17:
            autiusmpoint = 85;
            break;
          case 16:
            autiusmpoint = 84;
            break;
          case 15:
            autiusmpoint = 83;
            break;
          default:
            return (
              <div>
                <p>Invalid score</p>
              </div>
            );
        }

        if ((autiusmpoint) => 83 && autiusmpoint <= 90) {
          return (
            <div>
              <p>chiled doesnt have autism and autismScore: {autiusmpoint}</p>
            </div>
          );
        } else if (autiusmpoint > 90 && autiusmpoint <= 110) {
          return (
            <div>
              <p>chiled may be have autism and autismScore: {autiusmpoint}</p>
            </div>
          );
        } else if (autiusmpoint > 110 && autiusmpoint <= 140) {
          return (
            <div>
              <p>chiled have autism and autismScore: {autiusmpoint}</p>
            </div>
          );
        }
        break;
      default:
        return (
          <div>
            <p>Invalid test type</p>
          </div>
        );
    }
  };

  const categoryName = useSelector((state) => state.categoryName);
  
  console.log(categoryName);
  const content = () => {
    switch (categoryName) {
      case "Difficulty Learning":
        return (
          <div >
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
      <div>
        <h2>Score: {scorefinal}</h2>
       <h3>{handleResult()}</h3> 
       
          {content()}
        
      </div>
      </Typography>
    </div>
  );
  
}

export default Result;
