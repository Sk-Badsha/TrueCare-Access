import React from "react";
import "../../styles/TeamMemberStyles.css";
function TeamMember() {
  const teamMembers = [
    {
      name: "Michael Doe",
      position: "Property Specialist",
      image:
        "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t1.jpg",
      description:
        "You can rely on our amazing features list, and our customer service will be a great experience.",
    },
    {
      name: "John Smith",
      position: "Property Specialist",
      image:
        "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg",
      description:
        "You can rely on our amazing features list, and our customer service will be a great experience.",
    },
    {
      name: "Jane Doe",
      position: "Property Specialist",
      image:
        "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t3.jpg",
      description:
        "You can rely on our amazing features list, and our customer service will be a great experience.",
    },
  ];

  return (
    <div className="py-5 team3 bg-light">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-7 text-center">
            <h3 className="mb-3">Experienced & Professional Team</h3>
            <h6 className="subtitle font-weight-normal">
              You can rely on our amazing features list and also our customer
              services will be a great experience for you without doubt and in
              no-time.
            </h6>
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4 mb-4 member" key={index}>
              <div className="row">
                <div className="col-md-12">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-12">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">
                      {member.name}
                    </h5>
                    <h6 className="subtitle">{member.position}</h6>
                    <p>{member.description}</p>
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a
                          href="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-instagram"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a
                          href="#"
                          className="text-decoration-none d-block px-1"
                        >
                          <i className="icon-social-behance"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
